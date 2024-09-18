export const QUIZ_INFO_ID = "QUIZ-INFO-7f25";

export function getCountdown() {
  const MAX_DURATION = 11;
  const t = Math.round(new Date().getTime() / 1000);
  return {
    countdown: MAX_DURATION - ((t % MAX_DURATION) + 1),
    max_duration: MAX_DURATION - 1,
  };
}

// export function listenForQuestionsChange() {
//   const changeStream = QuestionModel.watch();
//   changeStream.on("change", (stream) => {
//     console.log(stream)
//     // calculate total quiz time
//     try {
//       console.log("Question changed");
//       getTotalTimeOfQuiz().then((duration) =>
//         QuizDuration.update(duration)
//       );
//     } catch (error) {
//       console.log("Error: ", error);
//     }
//   });

//   changeStream.on('error', (err) => {
//     console.error('Change stream error:', err);
//   });
// }
