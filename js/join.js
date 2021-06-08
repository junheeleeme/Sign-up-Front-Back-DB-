// join.html
const eng_pattern = /[a-zA-Z]/;
const num_pattern = /[0-9]/;
const kor_parttern = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*$/;
let err_msg = '';

// 아이디 형식 체크
function chk_id(){
	
	const kor_pattern = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; 
	const special_pattern = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi;// 특수문자 제외: _
	const id_txt = document.querySelector('#uid_txt').value.replace(/ /g,""); //공백제거
	
	if( (eng_pattern.test(id_txt) && num_pattern.test(id_txt)) && 
    !special_pattern.test(id_txt) && id_txt.length > 5 && id_txt.length < 15 ){
	// 영문+숫자 && 특수문자 '_'만 허용 && 길이 6 이상 14이하
		
		return true;
	}else{
		return false;
	}	
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
    
    if(chk_same_pw(pw1, pw2)){ // 비밀번호 재입력 일치 확인

        if( chk_vali_pw(pw1) && chk_vali_pw(pw2) && chk_length_pw(pw1) && chk_length_pw(pw2) ){
            console.log("Paswword Clear")
            return true;
        }else{
        console.log("8~12자리 영문자와 숫자, 특수문자를 사용해야합니다.")
        return false;
        }
    }else{
        console.log("비밀번호가 일치하지 않습니다.")
        return false;
    }
}

//이메일 형식 체크
function chk_email(){
	
	const email_pattern = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
	const email_txt = email_input.value;
	if(email_pattern.test(email_txt)){ 
		return true;
	}else{
		return false;
	}
	
}

//숫자만 입 (한글 입력은 됨..
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
    
    if( phone1_txt.length > 2 && phone2_txt.length > 2 && phone3_txt.length > 3){// 전화번호 길이 체크
        if(!eng_pattern.test(phone1_txt) && !eng_pattern.test(phone2_txt) && !eng_pattern.test(phone3_txt)){
            if(!special_pattern.test(phone1_txt) && !special_pattern.test(phone2_txt) && !special_pattern.test(phone3_txt)){
                // 전호번호 value all clear
                phone1_input.classList.add('on');
                phone2_input.classList.add('on');
                phone3_input.classList.add('on'); 
                return true;
            }else{//특수문자 포함
                phone1_input.classList.remove('on');
                phone2_input.classList.remove('on');
                phone3_input.classList.remove('on');
                return false;
            }
        }else{//영문자 포함
            phone1_input.classList.remove('on');
            phone2_input.classList.remove('on');
            phone3_input.classList.remove('on');
            return false;
        }
    }else{//길이 부족
        phone1_input.classList.remove('on');
        phone2_input.classList.remove('on');
        phone3_input.classList.remove('on');
        return false;
    }    
}

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

//Event Handler

    const id_input = document.querySelector('#uid_txt');
    id_input.addEventListener('keyup', (e)=>{ //

        if(chk_id()){
            id_input.classList.add('on');
        }else{
            id_input.classList.remove('on');
        }

    })

	// 비밀번호 입력
	const pw_input = document.querySelector('#upw_txt');
	pw_input.addEventListener('keyup', (e)=>{ //pw 길이 체크

        if(chk_pw()){
            pw_input.classList.add('on'); 
            pwr_input.classList.add('on');            
        }else{
			pw_input.classList.remove('on');
            pwr_input.classList.remove('on');
		}
        
	})

	// 비밀번호 입력
	const pwr_input = document.querySelector('#upwr_txt');
	pwr_input.addEventListener('keyup', (e)=>{ 
		
        if(chk_pw()){
            pw_input.classList.add('on'); 
            pwr_input.classList.add('on');            
        }else{
			pw_input.classList.remove('on');
            pwr_input.classList.remove('on');
		}
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
	
	
	// 비밀번호 확인 보이기
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

    // Email 체크
    const email_input = document.querySelector('#uemail_txt');
    email_input.addEventListener('focusout', ()=>{

        if(chk_email()){
            email_input.classList.add('on');
        }else{
            email_input.classList.remove('on');
        }

    })
	
	// 전화번호 
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
    // 전화번호 value 체크
    phone1_input.addEventListener('focusout', (e)=>{
        chk_phone();
    })
    phone2_input.addEventListener('focusout', (e)=>{
        chk_phone();
    })
    phone3_input.addEventListener('focusout', (e)=>{
        chk_phone();
    })

	
    // 생년월일 value 체크
    const birth_input = document.querySelector('#ubirth_txt');
    birth_input.addEventListener('focusout', ()=>{
        chk_birth();
    })
    

	// Submit
	const submit = document.querySelector('#submit');

	submit.addEventListener('click', (e)=>{ // submit
        e.preventDefault();

        if(chk_id() && chk_pw() && chk_email() && chk_phone() && chk_birth()){
            
            const u_id = id_input.value;
            const u_pw = pw_input.value;
            const u_email = email_input.value;
            const u_phone = phone1_input.value + phone2_input.value + phone3_input.value;
            const birth = birth_input.value;
            const gender = document.querySelector('input[name="gender"]:checked').value;

            const _data = { 
                'id' : u_id,
                'pw' : u_pw,
                'email' : u_email,
                'phone' : u_phone,
                'birth' : birth,
                'gende' : gender
            }
            
            console.log(_data);
            
            $.ajax({
                url : '/create_ac',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type : 'POST',
                data : JSON.stringify(_data),
                cache: false,
                success : function(res){
                    console.log(res);
                },
                error : function(res){
                    console.log(res);
                }
            })             

        }
	})
	
		
		
		
		