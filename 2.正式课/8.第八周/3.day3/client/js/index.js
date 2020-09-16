$(function () {
    // 在这里去写通过权限信息渲染页面
    let $menuBox = $('.menuBox');
    let power = window.localStorage.getItem('power');

    // 如果local里的字段获取不到就是null
    if (power === null) {
        // 如果power是null证明当前local里没有power字段说明当前用户是非法进入的，那让他直接返回登录页
        alert('当前属于非法进入，请重新进入', {
            handled: () => {
                window.location.href = 'login.html';
            }
        })
    }
    console.log(power);
    // userhandle|departhandle|jobhandle|departcustomer|allcustomer|resetpassword

    let str = `
<div class="itemBox">
    <h3>
      <i class="iconfont icon-yuangong"></i>
      员工管理
    </h3>
    <nav class="item">
      <a href="page/userlist.html" target="A">员工列表</a>
      ${power.includes('userhandle') ? `<a href="page/useradd.html" target="A">新增员工</a>` : ``}
    </nav>
</div>
<div class="itemBox">
    <h3>
        <i class="iconfont icon-guanliyuan"></i>
        部门管理
    </h3>
    <nav class="item">
        <a href="page/departmentlist.html" target="A">部门列表</a>
        ${power.includes('departhandle') ? `<a href="page/departmentadd.html" target="A">新增部门</a>` : ``}
    </nav>
</div>
<div class="itemBox">
    <h3>
        <i class="iconfont icon-zhiwuguanli"></i>
        职务管理
    </h3>
    <nav class="item">
        <a href="page/joblist.html" target="A">职务列表</a>
        ${power.includes('jobhandle') ? `<a href="page/jobadd.html" target="A">新增职务</a>` : ``}
    </nav>
</div>
<div class="itemBox">
    <h3>
        <i class="iconfont icon-kehuguanli"></i>
        客户管理
    </h3>
    <nav class="item">
        <a href="page/customerlist.html?lx=my" target="A">我的客户</a>
        ${power.includes('allcustomer') ? `<a href="page/customerlist.html?lx=all" target="A">全部客户</a>` : ''}
        <a href="page/customeradd.html" target="A">新增客户</a>
    </nav>
</div>
  `;
    $menuBox.html(str);
});
// $(function () {
//     let $menuBox = $('.menuBox');
//     let power = window.localStorage.getItem('power');
// let ary = [
//     {
//         title: '员工管理',
//         icon: 'icon-yuangong',
//         children: [
//             {
//                 href: 'page/userlist.html',
//                 subTitle: '员工列表',
//                 flag: ''
//             },
//             {
//                 href: 'page/useradd.html',
//                 subTitle: '新增员工',
//                 flag: 'userhandle'
//             }
//         ]
//     },
//     {
//         title: '部门管理',
//         icon: 'icon-guanliyuan',
//         children: [
//             {
//                 href: 'page/departmentlist.html',
//                 subTitle: '部门列表',
//                 flag: ''
//             },
//             {
//                 href: 'page/departmentadd.html',
//                 subTitle: '新增部门',
//                 flag: 'departhandle'
//             }
//         ]
//     }
// ];

let ary = [
    {
        title: '员工管理',
        icon: 'iconfont icon-yuangong',
        children: [
            {
                href: 'page/userlist.html',
                subTitle: '员工列表',
                flag: ''
            },
            {
                href: 'page/useradd.html',
                subTitle: '新增员工',
                flag: 'userhandle'
            }

        ]
    },
    {
        title: '部门管理',
        icon: 'iconfont icon-guanliyuan',
        children: [
            {
                href: 'page/departmentlist.html',
                subTitle: '部门列表',
                flag: ''
            },
            {
                href: 'page/departmentadd.html',
                subTitle: '新增部门',
                flag: 'departhandle'
            }
        ]
    },
    {
        title: '职务管理',
        icon: 'iconfont icon-zhiwuguanli',
        children: [
            {
                href: 'page/joblist.html',
                subTitle: '职务列表',
                flag: ''
            },
            {
                href: 'page/jobadd.html',
                subTitle: '新增职务',
                flag: 'jobhandle'
            }
        ]
    },
    {
        title: '客户管理',
        icon: 'iconfont icon-kehuguanli',
        children: [
            {
                href: 'page/customerlist.html',
                subTitle: '我的客户',
                flag: ''
            },
            {
                href: 'page/customerlist.html',
                subTitle: '全部客户',
                flag: 'allcustomer'
            },
            {
                href: 'page/customeradd.html',
                subTitle: '新增客户',
                flag: ''
            }
        ]
    }
]
//     let str = ``;
//     ary.forEach(item => {
//         // item ==>是ary中的每一个大对象(每一个大模块)
//         let {title,icon,children = []} = item;
//         str += `
//         <div class="itemBox">
//             <h3>
//                 <i class="iconfont ${icon}"></i>
//                 ${title}
//             </h3>
//             <nav class="item">
//                 ${children.map(item=>{
//                     // item ==>是children中的每一项
//                     let {href,subTitle,flag} = item;
//                     return `${power.includes(flag)? `<a href="${href}" target="A">${subTitle}</a>`:''}`
//                 }).join('')}
//             </nav>
//         </div>
//         `
//     });
//     $menuBox.html(str);
// });


// 页面正常的逻辑
$(function () {
    let $baseBox = $('.baseBox span');
    let $signOut = $('.baseBox a');
    let $menuBox = $('.menuBox');


    let $itemBox = $menuBox.find('.itemBox'); // 这是获取左侧菜单里的四个模块
    let $navList = $('.navBox a'); // 获取头部的两个a标签
    let $iframeBox = $('.iframeBox'); // 获取iframe标签



    // 进入主页的第一件事就是校验登录态，
    axios.get('user/login').then(result => {
        console.log(result);
        let {
            code,
            codeText
        } = result
        if (parseFloat(code) === 0) {
            // 当检验登录态的请求发送完成之后，并且是成功态我们才可以发送第二个获取用户详细信息的请求
            // axios.get('/user/info').then(()=>{

            // })
            return axios.get('/user/info');
        }
        alert('您当前的访问是违法的，请去登录', {
            handled: function () {
                // 如果用户登录时违法的，就让他跳转到登录页
                window.location.href = 'login.html';
            }
        });
        return Promise.reject(); // 如果当前登录时失败态的，就返回一个失败的Promise实例，让下面then中的成功的回调不要执行
    }).then((result) => {
        // 当axios.get('/user/info');的实例的状态是成功态的时候，次函数就会执行
        $baseBox.html(`您好：${result.data.name}`);
    });

    // 安全退出
    $signOut.click(function () {
        axios.get('/user/signout').then(result => {
            let {
                code,
                codeTeXT
            } = result;
            if (parseFloat(code) === 0) {
                alert('退出成功，即将跳转到登录页', {
                    handled: () => {
                        window.localStorage.removeItem('power');
                        window.location.href = 'login.html';
                    }
                });
                return;
            }
            alert('退出失败，请重新退出')
        })
    });

    // 利用事件委托实现菜单的折叠
    $menuBox.click(function (e) {
        let target = e.target; // 获取当前事件源
        let tagName = target.tagName;
        let $target = $(target);
        if (tagName === 'I') {
            // 如果当前的tagName是I的话，那我就把$target改为当前i的父元素h3
            // 还把target改为H3
            $target = $target.parent();
            tagName = 'H3';

            // 把事件源统一化
        }

        if (tagName === 'H3') {
            // $(target).next() // 获取H3的兄弟元素nav
            $target.next('nav').stop().slideToggle(300);
            // slideToggle会自动判断，如果当前的元素是收起来的，那他就是自动展开，反之就自动收起
        }
    });



    // 给头部两个的a标签绑定切换左侧菜单的功能

    // 利用刷新页面hash的子不会变化实现记录之前的显示
    let initIndex = 0;
    let URL = window.location.href;
    let HASH = URL.queryURLParams()['HASH'] || 'a';
    // let HASH = window.location.hash || 'a'; // 注意获取的是 '#a'，低下判断的时候注意一下就行了

    // 如果是第一次打开页面，那就没有hash值 ，那就给HASH默认指定是 'a';
    // 如果当前页面的hash值是b说明现在应该显示 最后一个itemBox，前三个隐藏，
    // 如果当前的页面的hash是a，那就不需要做什么
    if (HASH === 'b') {
        initIndex = 1;
    };


    // 先获取前三个itemBox
    let $organization = $itemBox.filter(':lt(3)');
    // 在获取最后一个itemBox
    let $customer = $itemBox.eq(3);
    $navList.click(function () {
        let index = $(this).index() // 获取当前点击的a标签对应的索引
        change(index);
    });
    change(initIndex); // 页面初次渲染的时候，让change先执行一次，使其页面显示前三个itemBox
    function change(index) {
        $navList.eq(index).addClass('active').siblings().removeClass('active');
        if (index === 0) {
            // 说明点击的是第一个a标签，应该让前三个itemBox显示，让最后一个itemBox隐藏
            $organization.css('display', 'block');
            $customer.css('display', 'none');
            $iframeBox.attr('src', 'page/userlist.html');

        }
        else {
            $organization.css('display', 'none');
            $customer.css('display', 'block');
            $iframeBox.attr('src', 'page/customerlist.html?lx=my');
        }
    }
});

