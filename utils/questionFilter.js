
const nextCharacter = (c) => {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}

const questionFilter = (data) => {
    const finalQuiz = [];
    for(let k=0;k<data.length;k++){
        const question = data[k].question;
        const ans = data[k].answer.trim();
        var val = 'b';
        var array = [];
        var l = ans.length;
        var tem_ans = "";
        for(let i=2;i<l;i++){
            if(i+1 < l && ans[i]==(val) && ans[i+1]==')'){
                array.push(tem_ans.trim());
                tem_ans = "";
                val = nextCharacter(val);
                i++;
            }else{
                tem_ans +=ans[i];
            }
        }
        array.push(tem_ans.trim());
        finalQuiz.push({question,option:array});
    }

    return finalQuiz;
};

module.exports = { questionFilter };
