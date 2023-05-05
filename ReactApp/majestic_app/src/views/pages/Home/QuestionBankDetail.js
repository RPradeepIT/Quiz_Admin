import React from 'react'
import { useConfirm } from 'material-ui-confirm'

const QuestionBankDetail = ({
  item,
  key,
  id,
  _editQuestionBank,
  _deleteQuestionBank,
}) => {
  const confirmalert = useConfirm()

  const deleteQuestionBank = () => {
    confirmalert({
      description: 'Are you sure to remove question?',
    }).then(() => _deleteQuestionBank && _deleteQuestionBank(id))
  }

  const editQuestionBank = () => {
    _editQuestionBank && _editQuestionBank(id)
  }

  return (
    <div className="panel panel-default" key={`questionBank-${id}`}>
      <div className="panel-heading">
        <h4 className="panel-question">
          <a
            data-toggle="collapse"
            data-parent="#accordion"
            href={`#questionBank-${id}`}
          >
            {item && item.question}
          </a>
        </h4>
      </div>

      <div id={`questionBank-${id}`} className="panel-collapse collapse">
        <div className="panel-body">
          <ul className="list-group">
            {item && item.answer1 && (
              <li key={`item-${id}-${1}`} className="list-group-item">
                <b>Option 1 : {item.answer1}</b>
              </li>
            )}
            {item && item.answer2 && (
              <li key={`item-${id}-${2}`} className="list-group-item">
                <b>Option 2 : {item.answer2}</b>
              </li>
            )}
            {item && item.answer3 && (
              <li key={`item-${id}-${3}`} className="list-group-item">
                <b>Option 3 : {item.answer3}</b>
              </li>
            )}
            {item && item.answer4 && (
              <li key={`item-${id}-${4}`} className="list-group-item">
                <b>Option 4 : {item.answer4}</b>
              </li>
            )}
          </ul>
          <div className="form-group">
            <div className="col-sm-12 pad-0">
              <button
                type="submit"
                onClick={(e) => deleteQuestionBank()}
                className="btn btn-sub btn-edit-form"
              >
                DELETE
              </button>
              <button
                type="submit"
                onClick={(e) => editQuestionBank()}
                className="btn btn-add btn-edit-form"
              >
                EDIT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuestionBankDetail
