const correctAnswers = ['B', 'B', 'B', 'B'];
const form = document.querySelector('.quiz-form');
const result = document.querySelector('.result');

form.addEventListener('submit', e => {
    //Prevent refresh
    e.preventDefault();

    let score = 0;
    const userAnwers = [form.q1.value, form.q2.value, form.q3.value, form.q4.value];

    //Check answers
    userAnwers.forEach((answer, index) => {
        if(answer === correctAnswers[index]){
            score += 25;
        }
    });

    //show result on page
    //Window object - scroll up
    scrollTo(0,0);
    result.querySelector('span').textContent = `${score}%`;
    result.classList.remove('d-none');

    //timer & animation counter
    let output = 0;
    const timer = setInterval(() => {
        result.querySelector('span').textContent = `${output}`;
        if(output === score){
            clearInterval(timer);
        } else {
            output++;
        }
    }, 10);


});


