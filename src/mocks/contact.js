let users = [
    { id: 'caixia', name: '彩霞', dept: '開發處', company: 'MSL', position: '工程師', icon: 'assets/img/avatar-ts-squeeze.png' },
    { id: 'erkang', name: '尔康', dept: '開發處', company: 'MSL', position: '工程師', icon: 'assets/img/avatar-ts-squeeze.png' },
    { id: 'ertai', name: '尔泰', dept: '開發處', company: 'MSL', position: '工程師', icon: 'assets/img/avatar-ts-squeeze.png' },
    { id: 'fuheng', name: '傅恒', dept: '開發處', company: 'MSL', position: '工程師', icon: 'assets/img/avatar-ts-squeeze.png' },
    { id: 'fujin', name: '福晋', dept: '開發處', company: 'MSL', position: '工程師', icon: 'assets/img/avatar-ts-squeeze.png' },
    { id: 'fulun', name: '福伦', dept: '開發處', company: 'MSL', position: '工程師', icon: 'assets/img/avatar-ts-squeeze.png' },
    { id: 'huanghou', name: '皇后', dept: '開發處', company: 'MSL', position: '工程師', icon: 'assets/img/avatar-ts-squeeze.png' },
    { id: 'huangshang', name: '皇上', dept: '開發處', company: 'MSL', position: '工程師', icon: 'assets/img/avatar-ts-squeeze.png' },
    { id: 'jingsuo', name: '金锁', dept: '開發處', company: 'MSL', position: '工程師', icon: 'assets/img/avatar-ts-squeeze.png' },
    { id: 'laofuoye', name: '老佛爷', dept: '開發處', company: 'MSL', position: '工程師', icon: 'assets/img/avatar-ts-squeeze.png' },
    { id: 'linfei', name: '令妃', dept: '開發處', company: 'MSL', position: '工程師', icon: 'assets/img/avatar-ts-squeeze.png' },
    { id: 'liuhong', name: '柳红', dept: '開發處', company: 'MSL', position: '工程師', icon: 'assets/img/avatar-ts-squeeze.png' },
    { id: 'liuqing', name: '柳青', dept: '開發處', company: 'MSL', position: '工程師', icon: 'assets/img/avatar-ts-squeeze.png' },
    { id: 'mingyue', name: '明月', dept: '開發處', company: 'MSL', position: '工程師', icon: 'assets/img/avatar-ts-squeeze.png' },
    { id: 'qinger', name: '晴儿', dept: '開發處', company: 'MSL', position: '工程師', icon: 'assets/img/avatar-ts-squeeze.png' },
    { id: 'rongmeme', name: '蓉嚒嚒', dept: '開發處', company: 'MSL', position: '工程師', icon: 'assets/img/avatar-ts-squeeze.png' },
    { id: 'saiya', name: '塞雅', dept: '開發處', company: 'MSL', position: '工程師', icon: 'assets/img/avatar-ts-squeeze.png' },
    { id: 'wuage', name: '五阿哥', dept: '開發處', company: 'MSL', position: '工程師', icon: 'assets/img/avatar-ts-squeeze.png' },
    { id: 'xiangfei', name: '香妃', dept: '開發處', company: 'MSL', position: '工程師', icon: 'assets/img/avatar-ts-squeeze.png' },
    { id: 'xiaodengzi', name: '小邓子', dept: '開發處', company: 'MSL', position: '工程師', icon: 'assets/img/avatar-ts-squeeze.png' },
    { id: 'xiaojian', name: '萧剑', dept: '開發處', company: 'MSL', position: '工程師', icon: 'assets/img/avatar-ts-squeeze.png' },
    { id: 'xiaoyanzi', name: '小燕子', dept: '開發處', company: 'MSL', position: '工程師', icon: 'assets/img/avatar-ts-squeeze.png' },
    { id: 'xiaozhuozi', name: '小卓子', dept: '開發處', company: 'MSL', position: '工程師', icon: 'assets/img/avatar-ts-squeeze.png' },
    { id: 'ziwei', name: '紫薇', dept: '開發處', company: 'MSL', position: '工程師', icon: 'assets/img/avatar-ts-squeeze.png' },
    { id: 'mahuateng', name: '马化腾', dept: '物流處', company: 'MSL', position: '工程師', icon: 'assets/img/mahuateng.png' },
    { id: 'mayun', name: '马云', dept: '銷售處', company: 'MSL', position: '工程師', icon: 'assets/img/mayun.png' },
    { id: 'dinglei', name: '丁磊', dept: '銷售處', company: 'MSL', position: '工程師', icon: 'assets/img/dinglei.png' },
    { id: 'liyanhong', name: '李彦宏', dept: '物流處', company: 'MSL', position: '工程師', icon: 'assets/img/avatar-ts-squeeze.png' },
    { id: 'liuqiangdong', name: '刘强东', dept: '物流處', company: 'MSL', position: '工程師', icon: 'assets/img/avatar-ts-squeeze.png' },
    { id: 'liuchuanzhi', name: '刘传志', dept: '物流處', company: 'MSL', position: '工程師', icon: 'assets/img/avatar-ts-squeeze.png' },
    { id: 'Woody', name: '小明', dept: '物流處', company: 'MSL', position: '工程師', icon: 'assets/img/avatar-ts-woody.png' },
    { id: 'Slinky Dog', name: '小狗', dept: '物流處', company: 'MSL', position: '工程師', icon: 'assets/img/avatar-ts-slinky.png' },
    { id: 'Barbie', name: 'Barbie', dept: '物流處', company: 'MSL', position: '工程師', icon: 'assets/img/avatar-ts-barbie.png' },
    { id: 'Squeeze', name: 'Squeeze', dept: '物流處', company: 'MSL', position: '工程師', icon: 'assets/img/avatar-ts-squeeze.png' }
];


users = users.sort((a, b) => a.id.charCodeAt(0) - b.id.charCodeAt(0));

let table = users.map((v) => {
    return {
        name: v.name,
        id: v.id,
        icon: v.icon,
        dept: v.dept,
        company: v.company,
        position: v.position
    };
});
export default table