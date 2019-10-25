$(function () {
  console.log('program is running');

  $('#login').click(login);
  $('#register').click(register);

  // 注册登录页切换
  $(".tag-login").click(function () {
    if (!$(this).hasClass('active')) {
      $(this).addClass('active');
      $(".login-box").show();
      $(".register-box").hide();
      $(".tag-register").removeClass('active');
    }
  })
  $(".tag-register").click(function () {
    if (!$(this).hasClass('active')) {
      $(".tag-register").addClass('active');
      $(".login-box").hide();
      $(".register-box").show();
      $(".tag-login").removeClass('active');
    }
  })
  //登陆
  function login() {
    var loginFlag = checkAcount($('#login-username').val(), $('#login-password').val());
    if (!loginFlag.login) {
      if (loginFlag.reason === 'username') {
        $('#login-username-x').css('display', 'block');
        setTimeout(function () {
          $('#login-username-x').hide(200);
        }, 2000)
      } else {
        $('#login-password-x').css('display', 'block');
        setTimeout(function () {
          $('#login-password-x').hide(200);
        }, 2000)
      }
      console.log(loginFlag.reason);
    } else {
      $.ajax({
        type: "post",
        url: "userlogin",
        data: { username: $('#login-username').val(), password: $('#login-password').val(), logintype: '0' },
        dataType: "json",
        success: function (response) {
          console.log('登录成功', response)
        }
      });
    }
  }
  //注册
  function register() {
    var registerFlag = checkAcount($('#register-username').val(), $('#register-password').val());
    if ($('#register-password').val() !== $('#repeat-password').val()) {
      $('#repeat-password-x').css('display', 'block');
      setTimeout(function () {
        $('#repeat-password-x').hide(200);
      }, 2000)
      return;
    }
    if (!registerFlag.login) {
      if (registerFlag.reason === 'username') {
        $('#register-username-x').css('display', 'block');
        setTimeout(function () {
          $('#register-username-x').hide(200);
        }, 2000)
      } else {
        $('#register-password-x').css('display', 'block');
        setTimeout(function () {
          $('#register-password-x').hide(200);
        }, 2000)
      }

      console.log(registerFlag.reason);
    } else {
      $.ajax({
        type: "post",
        url: "userlogin",
        data: { username: $('#register-username').val(), password: $('#register-password').val(), logintype: '1' },
        dataType: "json",
        success: function (response) {
          console.log('注册成功', response)
        }
      });
    }
  }
  // 账号 密码检测
  function checkAcount(usernmame, password) {
    var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
    var pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[a-z]).*$/;
    if (!uPattern.test(usernmame)) {
      return { login: false, reason: 'username' }
    }
    if (!pPattern.test(password)) {
      return { login: false, reason: 'password' }
    }
    return { login: true, reason: '' }
  }

  //防抖函数
  // function debounce(fn, delay) {
  //   return args => {
  //     clearTimeout(fn.id)

  //     fn.id = setTimeout(() => {
  //       fn.call(this, args)
  //     }, delay)
  //   }
  // }
})