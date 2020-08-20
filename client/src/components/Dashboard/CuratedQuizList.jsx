import React from "react";
import QuizInfo from "./QuizInfo";

const CuratedQuizList = (props) => {
  return (
    <div className={props.classes}>
      <div className="profile-name">Curated Quizzes</div>
      <div className="profile-email">
        Quizzes curated by you. Copy and share the code.
      </div>

      <table className="table mt-4">
        <thead className="count-title">
          <tr>
            <th scope="col">Serial</th>
            <th scope="col">Title</th>
            <th scope="col">Created at</th>
            <th scope="col">Total Participant</th>
            <th scope="col">Total Flawless</th>
            <th scope="col">Quiz Code</th>
          </tr>
        </thead>
        <tbody>
          {props.quizzes.map((quiz) => (
            <QuizInfo
              key={quiz._id}
              title={quiz.title}
              id={quiz._id}
              participated={quiz.participated}
              flawless={quiz.flawless}
              date={quiz.date}
            />
          ))}
          {/* <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr> */}
        </tbody>
      </table>
      {/* <div className="row mt-4">
        <div className="col-sm-5">
          <div className="count-title">Title</div>
        </div>
        <div className="col-sm-2">
          <div className="count-title">Total Participated</div>
        </div>
        <div className="col-sm-2">
          <div className="count-title">Total Flawless</div>
        </div>
        <div className="col-sm-3">
          <div className="count-title">Quiz Code</div>
        </div>
      </div>
      <hr />
      <div className="row mt-4">
        <div className="col-sm-12">
          {props.quizzes.map((quiz) => (
            <QuizInfo
              key={quiz._id}
              title={quiz.title}
              id={quiz._id}
              participated={quiz.participated}
              flawless={quiz.flawless}
              date={quiz.date}
            />
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default CuratedQuizList;
