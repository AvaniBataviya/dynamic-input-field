import React, { useCallback, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Container,
  FormLabel,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useImmer } from "use-immer";

const defaultData = {
  firstName: "",
  lastName: "",
};

function App() {
  const [formInputs, setFormInputs] = useImmer([{ ...defaultData }]);

  const onChange = useCallback(
    (e, index) => {
      const { name, value } = e.target;
      setFormInputs((draft) => {
        draft[index][name] = value;
      });
    },
    [setFormInputs]
  );

  const onAddClick = useCallback(() => {
    setFormInputs([...formInputs, { ...defaultData }]);
  }, [formInputs, setFormInputs]);

  const onRemoveClick = useCallback(
    (index) => {
      const data = [...formInputs];
      data.splice(index, 1);
      setFormInputs(data);
    },
    [formInputs, setFormInputs]
  );

  return (
    <Stack alignItems="center">
      <Typography component="h2" variant="h4" mb={5}>
        Add or Remove input fields dynamically with React Hooks
      </Typography>
      <Container maxWidth="md">
        <Card variant="outlined">
          <CardContent>
            <FormLabel component="legend">Enter name of colleague </FormLabel>
            {formInputs.map((element, index) => {
              return (
                <Grid container spacing={2} key={index} alignItems="center">
                  <Grid container item xs={9}>
                    <Grid item display="flex" width="100%">
                      <TextField
                        label="First name"
                        name="firstName"
                        value={element.firstName}
                        onChange={(e) => onChange(e, index)}
                        margin="dense"
                        fullWidth
                        sx={{ mr: 1 }}
                      />
                      <TextField
                        label="Last name"
                        name="lastName"
                        value={element.lastName}
                        onChange={(e) => onChange(e, index)}
                        margin="dense"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={3}>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      {formInputs.length - 1 === index && (
                        <Button
                          variant="contained"
                          size="small"
                          sx={{ ml: 2 }}
                          onClick={onAddClick}
                        >
                          Add
                        </Button>
                      )}
                      {formInputs.length > 0 && formInputs.length !== 1 && (
                        <Button
                          variant="contained"
                          size="small"
                          color="error"
                          sx={{ ml: 2 }}
                          onClick={() => onRemoveClick(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              );
            })}
            <Box mt={5}>{JSON.stringify(formInputs)}</Box>
          </CardContent>
        </Card>
      </Container>
    </Stack>
  );
}

export default App;
