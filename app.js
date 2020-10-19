let input = document.querySelector('#input');
let searchBtn = document.querySelector('#search');
let apiKey = 'eda166e0-61f1-42ce-bbed-c15e660c76ea';
let notFound = document.querySelector('.not__found');
let defBox=document.querySelector('#def');
let audioBox=document.querySelector('.audio');
let loading=document.querySelector('.loading');

searchBtn.addEventListener('click', function (e) {
    e.preventDefault();

    //clear data
    audioBox.innerHTML="";
    notFound.innerText='';
    defBox.innerText='';



    //Get Input data
    let word = input.value;
    if (word == '') {
        alert("word is required");
        return;
    }
    getData(word);


    //call api


})

async function getData(word) {
    loading.style.display='block';
    //ajax call
    const response = await fetch(`https://dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`);
    const data = await response.json();

    //empty data
    if (!data.length) {
        loading.style.display='none';
        notFound.innerText = 'No result found!';
        return;
    }
    //if result suggetion
    if(typeof data[0]==='string')
    {
        loading.style.display='none';
        let heading=document.createElement('h3');
        heading.innerText='Did you mean?';
        notFound.appendChild(heading);
        data.forEach(element => {
            let suggetion=document.createElement('span');
            suggetion.classList.add('suggested');
            suggetion.innerText=element;
            notFound.appendChild(suggetion);
            
        })
        return;
    }
    //result found
    loading.style.display='none';
    let defination=data[0].shortdef[0];
    defBox.innerText=defination;

    const pronounce=data[0].hwi.prs[0].sound.audio;
    if(pronounce){
        renderSound(pronounce);
    }


    console.log(data);
}
function renderSound(pronounce){
    let subFolder=pronounce.charAt(0);
    let soundSrc=`https://media.merriam-webster.com/soundc11/${subFolder}/${pronounce}.wav?key=${apiKey}`;
    let aud=document.createElement('audio');
    aud.src=soundSrc;
    aud.controls=true;
    audioBox.appendChild(aud);
}