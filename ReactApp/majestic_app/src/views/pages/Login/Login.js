import React from 'react'
import { useHistory } from 'react-router-dom'
import useAppContext from '../../components/hooks/useToast'
import { useQuery } from 'react-query'

import './Login.css'
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Alert,
  Label,
} from 'react-bootstrap'
import { Grid } from '@material-ui/core'
import _ from 'lodash'
import getAPIData from '../../../models/api/api'
import apiEndPoints from '../../../models/api/apiEndpoints'

function loginReducer(state, action) {
  switch (action.type) {
    case 'SET_VALUE':
      return { ...state, LoginData: { ...state.LoginData, ...action.payload } }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const Login = ({ props }) => {
  const history = useHistory()
  const { showToastMessage, showLoading } = useAppContext()
  // const reDirect = loggedIn ? <Redirect to="/" push /> : ''
  const initialState = {
    LoginData: {},
    error: '',
  }

  const [state, dispatch] = React.useReducer(loginReducer, initialState)

  const handleChange = (e) => {
    const { name, value } = e.target
    dispatch({
      type: 'SET_VALUE',
      payload: { [name]: value },
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const { userId, password } = state.LoginData
    // if (userId === 'sasi@gmail.com' && password === 'sasi') {
    //   showToastMessage('Login Successfully', 'success')
    //   history.push({
    //     pathname: '/Home',
    //     state: {
    //       userId,
    //     },
    //   })
    // } else {
    //   showToastMessage('Please enter valid Username & Password ', 'error')
    // }
    if (!_.isEmpty(userId) && !_.isEmpty(password)) {
      const lgnvalid = await fetchdata(userId, password)
      console.log('lgnvalid', lgnvalid)
      if (lgnvalid && lgnvalid.length !== 0) {
        history.push({
          pathname: '/Home',
          state: {
            userId,
          },
        })
      } else {
        showToastMessage('Please enter valid Username & Password ', 'error')
      }
    } else {
      showToastMessage('Email & Password are mandatory fields', 'error')
    }
  }
  async function fetchdata(userId, password) {
    showLoading(true)
    const resultdata = await getAPIData(
      apiEndPoints.GetUserById.method,
      `${apiEndPoints.GetUserById.url}?emailid=${userId}&password=${password}`
    ).then((response) => {
      showLoading(false)
      return response?.data
    })

    return resultdata
  }
  return (
    <div className="Login">
      <Grid container className="Login-grid">
        <Form horizontal onSubmit={(e) => handleSubmit(e)}>
          <Grid container>
            <Label for="text" sm={4} className="LoginTitle">
              Login to Quiz-App
            </Label>
            <FormGroup row>
              <Grid item componentClass={ControlLabel} sm={2}>
                Email
              </Grid>
              <Grid item sm={10}>
                <FormControl
                  type="email"
                  id="userId"
                  name="userId"
                  placeholder="Email"
                  value={state.LoginData.userId}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </Grid>
            </FormGroup>
          </Grid>

          <Grid container>
            <FormGroup row>
              <Grid item componentClass={ControlLabel} sm={2}>
                Password
              </Grid>
              <Grid item sm={10}>
                <FormControl
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={state.LoginData.password}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </Grid>
            </FormGroup>
          </Grid>

          <FormGroup>
            <Grid item smOffset={2} sm={10}>
              <Button bsStyle="primary" type="submit">
                Sign in
              </Button>
            </Grid>
          </FormGroup>
        </Form>
        {state.error && (
          <Alert bsStyle="danger">
            <p>{state.error}</p>
          </Alert>
        )}
      </Grid>
    </div>
  )
}

export default Login
