import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  createStyles,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Input,
  makeStyles,
  Slider,
  TextField,
  Theme,
  Typography
} from '@material-ui/core';
import { numberChars, upperCaseChars, lowerCaseChars, symbolChars } from '../utils/characters'
import { classicNameResolver } from 'typescript';
// import Checkboxes from './Checkboxes';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    // backgroundColor: theme.palette.secondary.main,
    color: '#000',
    borderRadius: '10px',
    height: '800'
  },
  spacing: {
    padding: '20px'
  },
  button: {
    fontSize: '24px',
    textTransform: 'none'
  }
}));

const Container = () => {
  const classes = useStyles();
  // checkboxes
  const [state, setState] = React.useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  const [password, setPassword] = React.useState<string | undefined | null | void>("");
  const [newPassword, setNewPassword] = React.useState<string | undefined | null | void>("");
  const [checkAll, setCheckAll] = React.useState();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const checkBoxAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    if (checked) {
      setState({
        uppercase: !false,
        lowercase: !false,
        numbers: !false,
        symbols: !false,
      })
    } else {
      setState({
        uppercase: false,
        lowercase: false,
        numbers: false,
        symbols: false,
      })
    }
  }

  const { uppercase, lowercase, numbers, symbols } = state;

  const [value, setValue] = React.useState<number | string | Array<number | string>>(
    8,
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(8);
    } else if (value > 100) {
      setValue(100);
    }
  };

  // button
  const handleClick = () => {
    let genPassword = '';
    if (uppercase === true) {
      genPassword = genPassword + upperCaseChars;
    } if (lowercase === true) {
      genPassword = genPassword + lowerCaseChars
    } if (numbers === true) {
      genPassword = genPassword + numberChars
    } if (symbols === true) {
      genPassword = genPassword + symbolChars
    }
    setPassword(makePassword(genPassword))
  }

  const makePassword = (genPassword: string) => {
    const passwordLength = genPassword.length
    let newPassword = '';

    for (let i = 0; i < value; i++) {
      const passwordIndex = Math.round(Math.random() * passwordLength)
      newPassword = newPassword + genPassword.charAt(passwordIndex)
    }
    setNewPassword(newPassword)
  }


  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" textAlign="center">
      <Box width="600px" className={classes.root}>
        <TextField
          className={classes.spacing}
          value={newPassword}
          variant="outlined"
          InputProps={{
            readOnly: true,
          }} />

        <FormControl component="fieldset">
          <Grid container direction="row" justifyContent="center">
            <Grid item sm={12}>
              <Typography> Password Length </Typography>
              <Input
                error={(value < 8 || value > 100) ? true : false}
                value={value}
                onChange={handleInputChange}
                onBlur={handleBlur}
                inputProps={{
                  step: 1,
                  min: 8,
                  max: 100,
                  type: 'number',
                  'aria-labelledby': 'input-slider',
                }}
              />
            </Grid>
            <Grid item sm={12}>
              <FormControlLabel
                value="selectAll"
                control={<Checkbox
                  checked={uppercase && lowercase && numbers && symbols}
                  onChange={checkBoxAll}
                  name="selectAll"
                  color="default"
                />}
                label="Select All"
                labelPlacement="start"
              />
            </Grid>
          </Grid>
          <FormGroup aria-label="position" row>
            <FormControlLabel
              value="uppercase"
              control={<Checkbox
                checked={uppercase}
                onChange={handleChange}
                name="uppercase"
                color="default"
              />}
              label="Uppercase"
              labelPlacement="start"
            />
            <FormControlLabel
              value="lowercase"
              control={<Checkbox
                checked={lowercase}
                onChange={handleChange}
                name="lowercase"
                color="default" />}
              label="Lowercase"
              labelPlacement="start"
            />
            <FormControlLabel
              value="numbers"
              control={<Checkbox
                checked={numbers}
                onChange={handleChange}
                name="numbers"
                color="default" />}
              label="Numbers"
              labelPlacement="start"
            />
            <FormControlLabel
              value="symbols"
              control={<Checkbox
                checked={symbols}
                onChange={handleChange}
                name="symbols"
                color="default" />}
              label="Symbols"
              labelPlacement="start"
            />
          </FormGroup>
          <Button className={classes.button}
            disabled={
              (uppercase === false && lowercase === false && numbers === false && symbols === false)
                ||
                (value < 8 || value > 100)
                ?
                true : false}
            onClick={handleClick}>
            Create Password
          </Button>
        </FormControl>
      </Box>
    </Box>
  )
}

export default Container;