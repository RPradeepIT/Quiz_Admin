import React from 'react'

function homeReducer(state, action) {
  switch (action.type) {
    case 'SET_count':
      return { ...state, count: action.payload }
    case 'SET_inputs':
      return { ...state, inputs: action.payload }
    case 'SET_answers':
      return { ...state, answers: action.payload }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const AddQuestionBankForm = ({
  questionBanks,
  onClose,
  _handleAddQuestionBank,
}) => {
  const initialState = { count: 1, inputs: [0], answers: {} }

  const [state, dispatch] = React.useReducer(homeReducer, initialState)
  const questionRef = React.useRef()

  const handleAddQuestionBank = (e) => {
    e.preventDefault()
    let questionBankObject = {
      question: questionRef.current.value,
      ...state.answers,
    }
    questionBankObject = {
      id: questionBanks.length + 1,
      ...questionBankObject,
    }

    console.log('questionBankObject', questionBankObject)
    _handleAddQuestionBank(questionBankObject)
    dispatch({
      type: 'SET_count',
      payload: 1,
    })
    dispatch({
      type: 'SET_inputs',
      payload: [0],
    })
  }

  const onclick = (type) => {
    dispatch({
      type: 'SET_count',
      payload: type === 'add' ? state.count + 1 : state.count - 1,
    })
    const inputdata = state.inputs
    type == 'add' ? inputdata.push(state.count) : inputdata.pop()

    dispatch({
      type: 'SET_inputs',
      payload: inputdata,
    })
  }

  const onchangeanswer = (e) => {
    const { name, value } = e.target
    const keydata = `answer${[parseInt(name) + 1]}`
    const newdataval = { ...state.answers, ...{ [keydata]: value } }
    dispatch({
      type: 'SET_answers',
      payload: newdataval,
    })
  }

  const inputsList = state.inputs.map(function (input, index) {
    const y = input.toString()
    const ph = `Enter option ${input + 1}`
    return (
      <div key={index} className="form-group md-responsive-fix">
        <label className="col-sm-2 col-xs-2 list-right-label" htmlFor={y}>
          {input + 1})
        </label>
        <div className="col-sm-10 col-xs-10">
          <input
            type="textarea"
            className="form-control addqstn"
            id={y}
            name={y}
            placeholder={ph}
            onChange={(e) => onchangeanswer(e)}
          />
        </div>
      </div>
    )
  })

  return (
    <div>
      <h1 className="addq-head">Add a Question</h1>
      <form
        className="form-horizontal list-right-form"
        role="form"
        onSubmit={(e) => handleAddQuestionBank(e, this)}
      >
        <div className="list-right-qa-cntnr">
          <div className="form-group list-right-question col-sm-12">
            <label
              className="col-sm-2 col-xs-2 list-right-label"
              htmlFor="question"
            >
              Q
            </label>
            <div className="col-sm-10 col-xs-10">
              <textarea
                ref={questionRef}
                type="text"
                className="form-control addqstn"
                id="question"
                placeholder="Enter question here"
              />
            </div>
          </div>

          <div className="mob-optns">
            <div className="col-sm-6 pad-0">{inputsList}</div>
          </div>
        </div>

        <div className="form-group">
          <div className="col-sm-offset-1 col-sm-10 col-xs-12 mob-btn-container">
            <button
              type="button"
              className="btn btn-add btn-add-form mob-optns-btn"
              disabled={state.count === 4}
              onClick={() => onclick('add')}
            >
              Add Option
            </button>
            <button
              type="button"
              className="btn btn-sub btn-add-form mob-optns-btn"
              disabled={state.count === 1}
              onClick={() => onclick('sub')}
            >
              Remove Option
            </button>
            <button
              onClick={onClose}
              type="submit"
              className="btn btn-add btn-add-form"
              disabled={state.count < 2}
            >
              Add Question
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddQuestionBankForm
