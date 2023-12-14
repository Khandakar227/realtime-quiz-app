getTotalTimeOfQuiz and quizTime can be handled more efficiently using mongo changeStream. Listen for changes and update only when changed.
