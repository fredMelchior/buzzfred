import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import quiizz_questions from '../../../assets/data/quizz_questions.json'

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.scss'
})
export class QuizzComponent {
  title = ''

  questions:any
  questionSelected:any
  questionIndex = 0
  questionMaxIndex = 0

  answers:string[] = []
  answerSelected = ''

  isFinished = false

  ngOnInit(): void {
    if(quiizz_questions) {
      this.isFinished = false
      this.title = quiizz_questions.title
      this.questions = quiizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]
      this.questionMaxIndex = this.questions.length
    }
  }

  playerChoice(value:string){
    this.answers.push(value)
    this.nextStep()
  }

  async nextStep(){
    this.questionIndex += 1

    if (this.questionIndex < this.questionMaxIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    } else {
      const finalResult: string = await this.checkResult(this.answers)
      this.isFinished = true
      this.answerSelected = quiizz_questions.results[
        finalResult as keyof typeof quiizz_questions.results]
    }
  }

  async checkResult(answers:string[]) {
    const result = answers.reduce((prev, current, _i, arr)=>{
      if (
        arr.filter(item => item === prev).length >
        arr.filter(item => item === current).length
      ){
        return prev
      }
      else {
        return current
      }
    })

    return result
  }

}
