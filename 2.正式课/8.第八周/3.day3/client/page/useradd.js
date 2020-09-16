let userAdd = (function () {
    let $username = $('.username'),
        $spanusername = $('.spanusername'),
        $man = $('#man'),
        $woman = $('#woman'),
        $useremail = $('.useremail'),
        $spanuseremail = $('.spanuseremail'),
        $userphone = $('.userphone'),
        $spanuserphone = $('.spanuserphone'),
        $userdepartment = $('.userdepartment'),
        $userjob = $('.userjob'),
        $userdesc = $('.userdesc'),
        $submit = $('.submit');
    let isUpDate = false;
    let userId = null;

    // 进行两个下拉框的绑定
    let selectBind = () => {
        let promise1 = axios.get('department/list');
        let promise2 = axios.get('job/list');
        return axios.all([promise1, promise2]).then(result => {
            let [depart, job] = result;
            // 绑定部门信息列表
            if (parseFloat(depart.code) === 0) {
                let str = ``;
                depart.data.forEach(item => {
                    str += `<option value="${item.id}">${item.name}</option>`
                });
                $userdepartment.html(str);
            };
            // 绑定职务信息列表
            if (parseFloat(job.code) === 0) {
                let str1 = ``;
                job.data.forEach(item => {
                    str1 += `<option value="${item.id}">${item.name}</option>`
                });
                $userjob.html(str1);
            };


        })
    }

    let queryInfo = () => {
        axios.get('/user/info', {
            params: {
                userId
            }
        }).then(result => {
            if (parseFloat(result.code) === 0) {
                let {
                    id,
                    name,
                    sex,
                    email,
                    phone,
                    departmentId,
                    department,
                    jobId,
                    job,
                    desc
                } = result.data;

                if (sex == 1) {
                    $woman.prop('checked', true);
                };
                $username.val(name);
                $useremail.val(email);
                $userphone.val(phone);
                $userdepartment.val(departmentId);
                $userjob.val(jobId);
                $userdesc.val(desc);
            }
        })
    }

    // 用户名的校验
    let checkuserName = () => {
        let userNameVal = $username.val().trim();
        if (userNameVal.length === 0) {
            $spanusername.html('用户名字为必填，请重新输入');
            return false;
        }
        $spanusername.html('');
        return true;
    }

    let checkUserEmail = () => {
        let userEmail = $useremail.val().trim();
        let reg = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        if (userEmail.length === 0) {
            $spanuseremail.html('当前邮箱不能为空，请输入！');
            return false;
        }
        if (!reg.test(userEmail)) {
            $spanuseremail.html('当前邮箱格式不正确，请重新输入！');
            return false;
        }
        $spanuseremail.html('');
        return true;
    };

    let checkuserphone = () => {
        let userphone = $userphone.val().trim();
        let reg = /^1[3-8]\d{9}$/;
        if (userphone.length === 0) {
            $spanuserphone.html('当前手机号不能为空，请输入！');
            return false;
        }
        if (!reg.test(userphone)) {
            $spanuserphone.html('当前手机号格式不正确，请重新输入！');
            return false;
        }
        $spanuserphone.html('');
        return true;
    }

    let submitHandle = () => {
        $submit.click(function () {
            // 拿到页面数据进行修改或者新增的请求
            let url = isUpDate ? 'user/update' : 'user/add';

            // 进行表单的校验
            if (!checkuserName() || !checkuserphone() || !checkUserEmail()) return;
     
            
            axios.post(url, {
                userId: isUpDate ? userId : null,
                name: $username.val().trim(),
                sex: $woman.prop('checked') ? 1 : 0,
                email: $useremail.val().trim(),
                phone: $userphone.val().trim(),
                departmentId: $userdepartment.val(),
                jobId: $userjob.val(),
                desc: $userdesc.val().trim()
            }).then(result => {
                if (parseFloat(result.code) === 0) {
                    alert(`当前${isUpDate ? '修改' : '新增'}操作成功，即将跳转到用户列表页`, {
                        handled: () => {
                            window.location.href = 'userlist.html'
                        }
                    });
                    return;
                }
                return Promise.reject();
            }).catch(() => {
                alert(`当前${isUpDate ? '修改' : '新增'}操作失败，即将跳转到用户列表页`, {
                    handled: () => {
                        window.location.href = 'userlist.html'
                    }
                });
            })
        })
    };





    return {
        init: () => {
            // 获取url中的参数，看看有没有userId这个字段，如果有就是从编辑过来的，如果没有就是从新增过来的
            let paramsObj = window.location.href.queryURLParams();
            if ('userId' in paramsObj) {
                isUpDate = true;
                userId = paramsObj.userId;

            };
            // selectBind().then(() => {
            //     // 此处的函数会在两个框绑定完成之后执行
            //     // 如果你是从编辑进行来，那你还得继续发送请求当前用户详细信息的接口
            //     if (isUpDate) {
            //         queryInfo()
            //     }
            // });
             if (isUpDate) {
                    queryInfo()
                }


            $username.on('blur', checkuserName);
            $useremail.on('blur', checkUserEmail);
            $userphone.on('blur', checkuserphone);
            submitHandle();
        }


    }
})();
userAdd.init()