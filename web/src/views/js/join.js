// join.html
const eng_pattern = /[a-zA-Z]/;
const num_pattern = /[0-9]/;
const kor_parttern = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*$/;
const name_parttern = /^[|가-힣]*$/;
let err_msg = '';

// 아이디 형식 체크
function chk_id(){
	
	const kor_pattern = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; 
	const special_pattern = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi;// 특수문자 제외: _
	const id_txt = document.querySelector('#uid_txt').value.replace(/ /g,""); //공백제거
	const err = document.querySelector('#id_sec>.err_msg');

	if( (eng_pattern.test(id_txt) && num_pattern.test(id_txt)) && 
    !special_pattern.test(id_txt) && !kor_pattern.test(id_txt) && id_txt.length > 5 && id_txt.length < 15 ){
	// 영문+숫자 && 특수문자 '_'만 허용 && 길이 6 이상 14이하
		
		return true;
	}else{
        err.textContent = "아이디 형식 오류! 영문자와 숫자, 특수문자(_) 조합으로 사용";
        addOffClass(id_input);       
		return false;
	}	

}

// 아이디 중복 여부 체크
function chk_overlap_id(callback){ 
	
	const id_txt = document.querySelector('#uid_txt').value;
	const data = { account : { 'id' : id_txt } };
    const err_msg = document.querySelector('#id_sec>.err_msg');
	
	return new Promise((resolve, reject) =>{
		
		axios.post('/chk_overlap_id', data).then( (res) => {
		if(res.status === 200){
			console.log("사용 가능한 아이디");
			addOnClass(id_input);
			resolve(true);
		}
		}).catch( (err)=> {  
			//console.log(err); 
			err_msg.textContent = "존재하는 아이디입니다.";
			addOffClass(id_input);
			reject('중복된 아이디');
		});	
	});

//    ********* Axios Ajax *********
	
    
//    ********* Jquery Ajax *********
/* 
        $.ajax({ // 아이디 중복 확인 AJAX코드
        url : 
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type : 'POST',
        data : JSON.stringify(id_txt),
        cache: false,
        success : function(res){
            
        },
        error : function(res){
            
        }
    }) 
*/
}

//비밀번호 재입력 일치 체크
function chk_same_pw(passwd1, passwd2){   

	if(  (passwd1 === passwd2) ){
		return true;
	}else{
		return false;
	}
}

//비밀번호 길이 체크 + 일치 체크
function chk_length_pw(passwd){
    if( passwd.length > 7 && passwd.length <13 ){
        return true;
    }else{
        return false;
    }
}

function chk_vali_pw(passwd){ //영문대소문자 + 숫자 + 특수문자의 조합일 경우

    const All_special_pattern = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi; //특수문자 전체

    if( (eng_pattern.test(passwd) && num_pattern.test(passwd)) && All_special_pattern.test(passwd) ){
        return true;
    }else{
        return false;
    }
}

//비밀번호 형식 체크
function chk_pw(){
    
    const pw1 = document.querySelector('#upw_txt').value.replace(/ /g,"");
    const pw2 = document.querySelector('#upwr_txt').value.replace(/ /g,"");
    const err = document.querySelector('#pw_sec>.err_msg');

    if(chk_same_pw(pw1, pw2)){ // 비밀번호 재입력 일치 확인

        if( chk_vali_pw(pw1) && chk_vali_pw(pw2) && chk_length_pw(pw1) && chk_length_pw(pw2) ){
            addOnClass(pw_input); 
            addOnClass(pwr_input);
            return true;
        }else{
            err.textContent = "8~12자리 영문자와 숫자, 특수문자를 사용해야합니다.";
            addOffClass(pw_input); 
            addOffClass(pwr_input);
            return false;
        }
    }else{
        err.textContent = "비밀번호가 일치하지 않습니다.";
        addOffClass(pw_input); 
        addOffClass(pwr_input);
        return false;
    }
}

//이메일 형식 체크
function chk_email(){
	const err = document.querySelector('#email_sec>.err_msg');
	const email_pattern = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
	const email_txt = email_input.value;

	if(email_pattern.test(email_txt)){
        addOnClass(email_input);
        return true;
	}else{
		err.textContent = "이메일 형식이 올바르지 않습니다.";
        addOffClass(email_input);
        return false;
	}
	
}

//숫자만 입력 (한글 입력은 됨..
function only_num(keyCode){

    if( (keyCode > 47 && keyCode < 58) || keyCode === 46 || keyCode === 8 || keyCode === 9 ){
        return true
    }else{
        return false;
    }

}

//전화번호 value 체크
function chk_phone(){
    
    const special_pattern = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi; //특수문자 전체
    const phone1_txt = document.querySelector('#uphone_txt1').value.replace(/ /g,""); //공백제거;
    const phone2_txt = document.querySelector('#uphone_txt2').value.replace(/ /g,""); //공백제거;
    const phone3_txt = document.querySelector('#uphone_txt3').value.replace(/ /g,""); //공백제거;
    const err = document.querySelector('#phone_sec>.err_msg');
    
    if( phone1_txt.length > 2 && phone2_txt.length > 2 && phone3_txt.length > 3){// 전화번호 길이 체크
        if(!eng_pattern.test(phone1_txt) && !eng_pattern.test(phone2_txt) && !eng_pattern.test(phone3_txt)){
            if(!special_pattern.test(phone1_txt) && !special_pattern.test(phone2_txt) && !special_pattern.test(phone3_txt)){
                // 전호번호 value all clear
                addOnClass(phone1_input);
                addOnClass(phone2_input);
                addOnClass(phone3_input);
                return true;
            }else{//특수문자 포함
                err.textContent = "숫자만 입력해주세요.";
                addOffClass(phone1_input);
                addOffClass(phone2_input);
                addOffClass(phone3_input);
                return false;
            }
        }else{//영문자 포함
            err.textContent = "숫자만 입력해주세요.";
            addOffClass(phone1_input);
            addOffClass(phone2_input);
            addOffClass(phone3_input);
            return false;
        }
    }else{//길이 부족
        err.textContent = "전화번호 형식이 올바르지 않습니다.";
        addOffClass(phone1_input);
        addOffClass(phone2_input);
        addOffClass(phone3_input);
        return false;
    }    
}

function chk_name(){
    const err = document.querySelector('#name_sec>.err_msg');
    const name = name_input.value;
    const isValue = name_parttern.test(name);
    
    if( isValue && name.length > 1 && name.length < 6 ){
        addOnClass(name_input);
        return true;
    }else{
        err.textContent = "이름이 정확하지 않습니다.";
        addOffClass(name_input);
        return false;
    }
    
}


// 생년월일 체크
function chk_birth(){
    const birth_pattern = /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    const birth_txt = birth_input.value;
        
    if(birth_pattern.test(birth_txt)){
        birth_input.classList.add('on');
        return true;
    }else{
        birth_input.classList.remove('on');
        return false;
    }
}

function sign_up(data, res){

	return new Promise( (resolve, reject) =>{
		
		axios.post('/create_ac', data
		).then(function (res) {
			if(res.status === 200){
				console.log("회원가입 성공!");
				resolve(true);
			}
		})
		.catch(function (err) {
			console.log("회원가입 실패!");
			console.log(err);
			reject(false);
		});
		
	})
/*
    $.ajax({
        url : url,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type : 'POST',
        data : JSON.stringify(data),
        cache: false,
        success : function(res){
            console.log(res);
            console.log("회원가입 성공!");
        },
        error : function(res){
            console.log("회원가입 실패!");
        }
    })
*/
}

function addOnClass(target){
    target.classList.remove('off'); 
    target.classList.add('on'); 
}

function addOffClass(target){
    target.classList.remove('on'); 
    target.classList.add('off'); 
}

function removeClass(target){
    target.classList.remove('on');
    target.classList.remove('off');
}

//Event Handler
 
    // 아이디 중복/형식 체크 핸들러
    const id_input = document.querySelector('#uid_txt');
    id_input.addEventListener('focusout', (e)=>{ //
        
        if(chk_id()){// 아이디 형식 체크
            if(chk_overlap_id()){//중복 체크
                return true;
            }else{
                return false;
            }      
        }
    })
    
	// 비밀번호 형식 체크 핸들러
	const pw_input = document.querySelector('#upw_txt');
	pw_input.addEventListener('keyup', (e)=>{ //pw 길이 체크
        chk_pw();
	})
    pw_input.addEventListener('focusout', (e)=>{ 
		chk_pw();
	})

	// 비밀번호 입력
	const pwr_input = document.querySelector('#upwr_txt');
	pwr_input.addEventListener('keyup', (e)=>{ 
		chk_pw();
	})
    pwr_input.addEventListener('focusout', (e)=>{ 
		chk_pw();
	})
		
	// 비밀번호 보이기
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
	
	// 비밀번호 재입력 보이기
	const pwr_show = document.querySelector('.pwr_icon');
	pwr_show.addEventListener('click', (e)=>{ //패스워드 확인 보이기
		
		const input = document.querySelector('#upwr_txt');
			
		if(!pwr_show.classList.contains('on')){
			input.type = 'text';
			pwr_show.classList.add('on');
		}else{
			input.type = 'password';
			pwr_show.classList.remove('on');
		}
	})

    // Email 체크 핸들러
    const email_input = document.querySelector('#uemail_txt');
    email_input.addEventListener('focusout', ()=>{
        chk_email();
    })
	
	// 전화번호 인풋 박스 
	const phone1_input = document.querySelector('#uphone_txt1');
	const phone2_input = document.querySelector('#uphone_txt2');
	const phone3_input = document.querySelector('#uphone_txt3');
    
    // 전화번호 숫자 입력만 받기
	phone1_input.addEventListener('keydown', (e)=>{
		if(!only_num(e.keyCode)) e.preventDefault();
	})
	phone2_input.addEventListener('keydown', (e)=>{
		if(!only_num(e.keyCode)) e.preventDefault();
	})
	phone3_input.addEventListener('keydown', (e)=>{
		if(!only_num(e.keyCode)) e.preventDefault();
	})

    // 전화번호 형식 체크 핸들러
    phone1_input.addEventListener('focusout', (e)=>{
        chk_phone();
    })
    phone2_input.addEventListener('focusout', (e)=>{
        chk_phone();
    })
    phone3_input.addEventListener('focusout', (e)=>{
        chk_phone();
    })

    // 이름 형식 체크 핸들러
    const name_input = document.querySelector('#uname_txt');
    name_input.addEventListener('focusout', (e)=>{
        chk_name();
    })

	
    // 생년월일 형식 핸들러
    const birth_input = document.querySelector('#ubirth_txt');
    birth_input.addEventListener('focusout', ()=>{
        chk_birth();
    })
    

	// Submit
	const submit = document.querySelector('#submit');

	submit.addEventListener('click', (e)=>{ // submit
        e.preventDefault();
        if( chk_id() && chk_pw() && chk_email() && chk_phone() && chk_name() && chk_birth() ){
			
			chk_overlap_id().then((res) =>{
				
				if(res === true){
					
					const u_id = id_input.value;
					const u_pw = pw_input.value;
					const u_email = email_input.value;
					const u_phone = phone1_input.value + phone2_input.value + phone3_input.value;
					const u_name = name_input.value;
					const u_birth = birth_input.value;
					const u_gender = document.querySelector('input[name="gender"]:checked').value;

					const _data = { 
						'id' : u_id,
						'pw' : u_pw,
						'email' : u_email,
						'phone' : u_phone,
						'name' : u_name,
						'birth' : u_birth,
						'gender' : u_gender
					}
					
					sign_up(_data, (res)=>{
						if(res === true){
							console.log('회원가입 성공');
						}else{
							console.log('회원가입 실패');
						}			
					});		
				}
			})
        }
	})