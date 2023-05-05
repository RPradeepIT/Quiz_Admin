import React, { Component } from 'react'
import QuestionBankDetail from './QuestionBankDetail'

class QuestionBankList extends Component {
  constructor() {
    super()
    this.state = { mounted: false }
  }

  componentDidMount() {
    this.setState({ mounted: true })
  }

  deleteQuestionBank(id) {
    this.props._removeQuestionBank(id)
  }

  editQuestionBank(id) {
    this.props._modifyQuestionBank(id)
  }

  render() {
    let questionBankNames = ''
    if (this.state.mounted) {
      if (this.props.questionBanks.length === 0) {
        questionBankNames = <h4 className="emptyQB"> No questions yet</h4>
      } else {
        questionBankNames = this.props.questionBanks.map((data, idx) => {
          return (
            <QuestionBankDetail
              item={data}
              key={idx}
              id={idx}
              _deleteQuestionBank={(index) => this.deleteQuestionBank(index)}
              _editQuestionBank={(index) => this.editQuestionBank(index)}
            />
          )
        })
      }
    }

    return (
      <div>
        <div className="panel-group" id="accordion">
          {questionBankNames}
        </div>
      </div>
    )
  }
}

export default QuestionBankList
