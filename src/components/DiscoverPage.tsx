import React, { useState, useEffect, useMemo } from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { Client } from '@opensearch-project/opensearch';
import { TextField, Button, CircularProgress, Typography, Paper, Container, Grid } from '@mui/material';

// Define a generic data type for OpenSearch documents
type OpenSearchDocument = Record<string, any>;

const DiscoverPage: React.FC = () => {
  const [opensearchUrl, setOpensearchUrl] = useState<string>(localStorage.getItem('opensearchUrl') || '');
  const [indexPattern, setIndexPattern] = useState<string>(localStorage.getItem('indexPattern') || '');
  const [data, setData] = useState<OpenSearchDocument[]>([]);
  const [columns, setColumns] = useState<MRT_ColumnDef<OpenSearchDocument>[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showConnectionForm, setShowConnectionForm] = useState<boolean>(true);

  const opensearchClient = useMemo(() => {
    if (!opensearchUrl) return null;
    try {
      // Basic URL validation
      const url = new URL(opensearchUrl);
      return new Client({ node: url.href });
    } catch (e) {
      setError('Invalid OpenSearch URL format.');
      return null;
    }
  }, [opensearchUrl]);

  const fetchMetadataAndData = async () => {
    if (!opensearchClient || !indexPattern) {
      setError('OpenSearch URL and Index Pattern are required.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setData([]);
    setColumns([]);

    try {
      // 1. Fetch mapping for the index pattern to get column definitions
      const mappingResponse = await opensearchClient.indices.getMapping({
        index: indexPattern,
      });

      // Assuming the first index in the pattern is representative for mapping
      const firstIndexName = Object.keys(mappingResponse.body)[0];
      const properties = mappingResponse.body[firstIndexName]?.mappings?.properties;

      if (properties) {
        const generatedColumns: MRT_ColumnDef<OpenSearchDocument>[] = Object.keys(properties).map((key) => ({
          accessorKey: key,
          header: key.replace(/_/g, ' ').replace(/\w/g, l => l.toUpperCase()), // Format header
          // Add more column options based on property type if needed (e.g., filterVariant)
        }));
        setColumns(generatedColumns);
      } else {
        setError(`No properties found for index pattern: ${indexPattern}. Ensure the index exists and has mappings.`);
        setIsLoading(false);
        return;
      }

      // 2. Fetch data
      const searchResponse = await opensearchClient.search({
        index: indexPattern,
        body: {
          query: {
            match_all: {},
          },
          size: 100, // Adjust size as needed
        },
      });

      const hits = searchResponse.body.hits?.hits || [];
      const fetchedData = hits.map((hit: any) => ({ id: hit._id, ...hit._source }));
      setData(fetchedData);
      setShowConnectionForm(false); // Hide form on successful data load
      localStorage.setItem('opensearchUrl', opensearchUrl);
      localStorage.setItem('indexPattern', indexPattern);

    } catch (err: any) {
      console.error('Error fetching from OpenSearch:', err);
      let errorMessage = 'Failed to fetch data or metadata from OpenSearch.';
      if (err.meta && err.meta.body && err.meta.body.error) {
        errorMessage += ` Reason: ${err.meta.body.error.type} - ${err.meta.body.error.reason}`;
        if (err.meta.body.error.root_cause && err.meta.body.error.root_cause.length > 0) {
            errorMessage += ` Root cause: ${err.meta.body.error.root_cause[0].reason}`;
        }
      } else if (err.message) {
        errorMessage += ` Message: ${err.message}`;
      }
      setError(errorMessage);
      setData([]); // Clear data on error
      setColumns([]); // Clear columns on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnect = () => {
    if (opensearchUrl && indexPattern) {
      fetchMetadataAndData();
    } else {
      setError("Please provide both OpenSearch URL and Index Pattern.");
    }
  };

  const handleResetConnection = () => {
    setShowConnectionForm(true);
    setData([]);
    setColumns([]);
    setError(null);
    // Optionally clear localStorage too if desired
    // localStorage.removeItem('opensearchUrl');
    // localStorage.removeItem('indexPattern');
  }

  // Attempt to load data if URL and pattern exist in localStorage on initial load
  useEffect(() => {
    if (opensearchUrl && indexPattern && !showConnectionForm) {
      fetchMetadataAndData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount if conditions met


  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Discover OpenSearch Data
      </Typography>

      {showConnectionForm || error ? (
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>Connect to OpenSearch</Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={5}>
              <TextField
                label="OpenSearch URL"
                variant="outlined"
                fullWidth
                value={opensearchUrl}
                onChange={(e) => setOpensearchUrl(e.target.value)}
                placeholder="e.g., http://localhost:9200"
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                label="Index Pattern"
                variant="outlined"
                fullWidth
                value={indexPattern}
                onChange={(e) => setIndexPattern(e.target.value)}
                placeholder="e.g., my-index-*"
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleConnect}
                disabled={isLoading}
                fullWidth
                sx={{ height: '56px' }}
              >
                {isLoading ? <CircularProgress size={24} /> : 'Connect'}
              </Button>
            </Grid>
          </Grid>
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </Paper>
      ) : null}


      {!showConnectionForm && data.length > 0 && (
         <Button
            variant="outlined"
            onClick={handleResetConnection}
            sx={{ mb: 2 }}
          >
            Change Connection
          </Button>
      )}

      {isLoading && !error && <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />}

      {!isLoading && !showConnectionForm && data.length === 0 && !error && (
        <Typography sx={{ mt: 2 }}>No data found for the given index pattern, or connection not yet established.</Typography>
      )}

      {!showConnectionForm && data.length > 0 && columns.length > 0 && (
        <Paper elevation={3} sx={{ p: 0, overflowX: 'auto' /* Better handling for wide tables */ }}>
          <MaterialReactTable
            columns={columns}
            data={data}
            enableColumnFilterModes
            enableColumnResizing
            enableGrouping
            enablePinning
            enableRowActions={false} // Example: disable row actions
            enableRowSelection={false} // Example: disable row selection
            initialState={{ showColumnFilters: true, density: 'compact' }}
            muiTablePaginationProps={{
              rowsPerPageOptions: [10, 25, 50, 100, 200],
            }}
            // Add more MRT features as needed
          />
        </Paper>
      )}
    </Container>
  );
};

export default DiscoverPage;
