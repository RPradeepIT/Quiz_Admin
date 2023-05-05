import React, { Component } from 'react'

import { useQuery } from 'react-query'
import QuestionBankList from './QuestionBankList'

import AddQuestionBankForm from './AddQuestionBankForm'

import EditQuestionBankForm from './EditQuestionBankForm'
import useAppContext from '../../components/hooks/useToast'
import './Home.css'

import getAPIData from '../../../models/api/api'
import apiEndPoints from '../../../models/api/apiEndpoints'

function homeReducer(state, action) {
  switch (action.type) {
    case 'SET_questionBanks':
      return { ...state, questionBanks: action.payload }
    case 'SET_editingIndex':
      return { ...state, editingIndex: action.payload }
    case 'SET_editingData':
      return { ...state, editingData: action.payload }
    case 'SET_editModalOpen':
      return { ...state, editModalOpen: action.payload }
    case 'SET_active':
      return { ...state, active: action.payload }
    case 'SET_buttonText':
      return { ...state, buttonText: action.payload }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const Home = ({ history, props }) => {
  const { showToastMessage, showLoading } = useAppContext()

  const initialState = {
    active: 'col-md-4 list-left closePanel',

    modalOpen: props ? props.opened : false,

    editModalOpen: props ? props.editOpened : false,

    buttonText: 'ADD A QUESTION',

    questionBanks: [],

    editingData: '',

    editingIndex: '',
  }

  const [state, dispatch] = React.useReducer(homeReducer, initialState)

  React.useEffect(() => {
    async function fetchData() {
      if (history.location.state) {
        const QuizData = await getAPIData(
          apiEndPoints.GetAllQuizList.method,
          apiEndPoints.GetAllQuizList.url
        ).then((response) => response.data)

        dispatch({
          type: 'SET_questionBanks',
          payload: QuizData,
        })
      } else {
        history.push({
          pathname: '/',
          state: {
            userId: '',
          },
        })
      }
    }

    fetchData()
  }, [])

  async function addQuestionBank(questionBank) {
    const allQuestionBanks = state.questionBanks.concat([questionBank])

    dispatch({
      type: 'SET_questionBanks',
      payload: allQuestionBanks,
    })
    const result = await getAPIData(
      apiEndPoints.InsertQuizList.method,
      apiEndPoints.InsertQuizList.url,
      questionBank
    ).then((response) => response)
    if (result) showToastMessage('Inserted Successfully', 'success')
    else showToastMessage('Failed to insert', 'error')
  }

  async function deleteQuestionBank(index) {
    const finalQuestionBanks = state.questionBanks.filter((d, i) => i !== index)

    dispatch({
      type: 'SET_questionBanks',
      payload: finalQuestionBanks,
    })

    const result = await getAPIData(
      apiEndPoints.DeleteByIdQuizList.method,
      `${apiEndPoints.DeleteByIdQuizList.url}?id=${index}`
    ).then((response) => response)
    if (result) showToastMessage('Deleted Successfully', 'success')
    else showToastMessage('Failed to delete', 'error')
  }

  const editQuestionBank = (index) => {
    const editingData = state.questionBanks[index]

    dispatch({
      type: 'SET_editingIndex',
      payload: index,
    })
    dispatch({
      type: 'SET_editingData',
      payload: editingData,
    })

    dispatch({
      type: 'SET_editModalOpen',
      payload: !state.editModalOpen,
    })
  }

  const closeEditModal = () => {
    dispatch({
      type: 'SET_editModalOpen',
      payload: !state.editModalOpen,
    })

    dispatch({
      type: 'SET_editingIndex',
      payload: '',
    })
    dispatch({
      type: 'SET_editingData',
      payload: '',
    })
  }

  async function editQuestionBankComplete(index, questionBank) {
    debugger
    const { questionBanks } = state

    questionBanks[index] = questionBank

    dispatch({
      type: 'SET_questionBanks',
      payload: questionBanks,
    })

    dispatch({
      type: 'SET_editingIndex',
      payload: '',
    })
    dispatch({
      type: 'SET_editingData',
      payload: '',
    })

    const result = await getAPIData(
      apiEndPoints.UpdateByIdQuizList.method,
      `${apiEndPoints.UpdateByIdQuizList.url}?id=${index}`,
      questionBank
    ).then((response) => response)
    if (result) showToastMessage('Updated Successfully', 'success')
    else showToastMessage('Failed to update', 'error')
  }

  const onclick = (type) => {
    dispatch({
      type: 'SET_active',
      payload: type.includes('closePanel')
        ? 'col-md-4 list-left openPanel'
        : 'col-md-4 list-left closePanel',
    })
    dispatch({
      type: 'SET_buttonText',
      payload: type.includes('closePanel') ? 'CLOSE PANEL' : 'ADD A QUESTION',
    })
  }

  let editForm = ''

  if (state.editingData !== '') {
    editForm = (
      <EditQuestionBankForm
        show={state.editModalOpen}
        onClose={() => closeEditModal()}
        data={state.editingData}
        index={state.editingIndex}
        _handleEditQuestionBank={(index, questionBank) =>
          editQuestionBankComplete(index, questionBank)
        }
      />
    )
  }

  return (
    <div className="sub-container">
      {editForm}

      <div className={state.active}>
        <h1> Quiz Admin</h1>
        <div className="Logout">
          <button
            type="button"
            className="btn btn-sub btn-add-form mob-optns-btn"
            onClick={() =>
              history.push({
                pathname: '/',
                state: {
                  userId: '',
                },
              })
            }
          >
            Logout
          </button>
        </div>
        <div className="well list-left-accordion">
          <QuestionBankList
            questionBanks={state.questionBanks}
            _removeQuestionBank={(index) => deleteQuestionBank(index)}
            _modifyQuestionBank={(index) => editQuestionBank(index)}
          />

          <div className="addq-container">
            <button
              type="button"
              className="btn btn-add addq"
              onClick={() => onclick(state.active)}
            >
              {state.buttonText}
            </button>
          </div>
        </div>

        <div className="addq-mob">
          <button
            type="button"
            className="btn btn-add addq"
            onClick={() => onclick(state.active)}
          >
            {state.buttonText}
          </button>
        </div>
      </div>

      <div className="col-sm-6 col-md-4 list-right">
        <AddQuestionBankForm
          _handleAddQuestionBank={(questionBank) =>
            addQuestionBank(questionBank)
          }
          questionBanks={state.questionBanks}
        />
      </div>
    </div>
  )
}

export default Home
