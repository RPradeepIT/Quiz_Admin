import React, { Component } from 'react'

function homeReducer(state, action) {
  switch (action.type) {
    case 'SET_question':
      return { ...state, question: action.payload }
    case 'SET_inputs':
      return { ...state, inputs: action.payload }
    case 'SET_data':
      return { ...state, data: action.payload }
    case 'SET_inputdata':
      return { ...state, inputdata: action.payload }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const EditQuestionBankForm = ({
  props,
  index,
  data,
  show,
  onClose,
  _handleEditQuestionBank,
}) => {
  const initialState = { question: '', data, inputs: [], inputdata: [] }
  const [state, dispatch] = React.useReducer(homeReducer, initialState)

  const questionRef = React.useRef()

  function removekey(removedata) {}
  React.useEffect(() => {
    const u = []
    const tempinputdata = []
    const newdata = data

    data &&
      Object.keys(newdata).map(function (inp, index) {
        if (inp !== 'id' && inp !== 'question') {
          u.push(index)
          tempinputdata.push(data[inp])
        }
      })
    dispatch({
      type: 'SET_question',
      payload: data.question,
    })

    dispatch({
      type: 'SET_inputdata',
      payload: tempinputdata,
    })

    dispatch({
      type: 'SET_inputs',
      payload: u,
    })
  }, [])

  const handleEditQuestionBank = (e) => {
    e.preventDefault()
    _handleEditQuestionBank(index, state.data)
    onClose()
  }

  const changeQuestion = (e) => {
    const { name, value } = e.target
    const keydata = `question`
    const newdataval = { ...state.data, ...{ [keydata]: value } }

    dispatch({
      type: 'SET_data',
      payload: newdataval,
    })
  }

  const onchangeanswer = (e) => {
    const { name, value } = e.target
    const keydata = `answer${[parseInt(name) + 1]}`
    const newdataval = { ...state.data, ...{ [keydata]: value } }
    dispatch({
      type: 'SET_data',
      payload: newdataval,
    })
  }

  const styles = {
    modal: {
      display: show || 'none',
      zIndex: 100000,
    },
  }

  const inp = state.inputdata
  const inputsList =
    inp &&
    inp.map(function (input, index) {
      console.log('inputdata', input)
      const ph = `option ${index + 1}`
      return (
        <div key={index} className="form-group">
          <label className="col-sm-2 control-label" htmlFor="{index}">
            {ph}
          </label>
          <div className="col-sm-10">
            <input
              type="textarea"
              className="form-control"
              id={index}
              placeholder={input}
              name={index}
              onChange={(e) => onchangeanswer(e)}
            />
          </div>
        </div>
      )
    })

  return (
    <div className="modal-wrapper" style={styles.modal}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button
              onClick={onClose}
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 className="modal-question">Edit Question</h4>
          </div>

          <div className="modal-body">
            <form
              className="form-horizontal"
              role="form"
              onSubmit={(e) => handleEditQuestionBank(e)}
            >
              <div className="form-group">
                <label className="col-sm-2 control-label" htmlFor="question">
                  Question
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="question"
                    value={state.data.question}
                    onChange={(e) => changeQuestion(e)}
                    placeholder="Question"
                  />
                </div>
              </div>

              {inputsList}

              <div className="form-group">
                <div className="col-sm-offset-2 col-sm-10 modal-btn">
                  <button type="submit" className="btn btn-success">
                    Finish Edit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditQuestionBankForm
