//Functions

function getUrlParams() {     
    const _params = {};  
    
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, 

    function(str, key, value) { 
        _params[key] = value; 
    }
);
    return _params; 
}



//Event Handler

window.onload = () => {
	const params = getUrlParams();
    
    if(params.user === 'welcome'){
        const welcome = document.querySelector(".welcome");
        welcome.innerText = "회원가입을 축하합니다!."
    }
    

}


const pw_show = document.querySelector('.pw_icon');
pw_show.addEventListener('click', (e)=>{ //패스워드 보이기

	const input = document.querySelector('#upw_txt');

	if(!pw_show.classList.contains('on')){
		input.type = 'text';
		pw_show.classList.add('on');

	}else{
		input.type = 'password';
		pw_show.classList.remove('on');
	}		
})


// Submit
const submit = document.querySelector('#submit');
const err_msg = document.querySelector('.err_msg');

submit.addEventListener('click', (e)=>{ // submit
	e.preventDefault();


	const user = {
		id : document.querySelector('#uid_txt').value,
		pw : document.querySelector('#upw_txt').value
	};


	return new Promise((resolve, reject) =>{

		axios.post('/users/login', user).then( (res) => {

			const user_id = JSON.parse(res.config.data).id;
			
			if(res.status === 200){
				window.location.href= '/?user='+user_id;
				console.log("Login Successful");
				resolve(true);
			}

		}).catch( (err)=> {  
			//console.log(err); 
			err_msg.innerText = "아이디와 비밀번호를 확인해주세요.";
			reject('Login Failed!');
		});
		
	});
})
