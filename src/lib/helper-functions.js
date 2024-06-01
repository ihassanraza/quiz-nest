export function calculatePercentage(quiz) {
    const correctAnswers = quiz.filter((quizItem) => quizItem.answer === quizItem.selected).length;
    const percentage = (correctAnswers / quiz.length) * 100;
    return percentage;
}

export function handleDownloadCSV(quiz) {
    let csvRows = [];
    let header = Object.keys(quiz[0]).join(',');
    csvRows.push(header);
    
    for( let i = 0; i < quiz.length; i++ ) {
        let quizItem = quiz[i];
        if (Array.isArray(quizItem.options)) {
            quizItem.options = quizItem.options.join('|');
        } else {
            quizItem.options = quizItem.options.split(',').join('|');
        }
        let values = Object.values(quizItem).join(',');
        csvRows.push(values);
    }

    const csvData = csvRows.join('\n');
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url)
    a.setAttribute('download', 'quiz-nest.csv');
    a.click()
}