
const wxRequest = async(params = {}, url) => {
    let data = params.query || {};
    let res = await wepy.request({
        url: url,
        method: params.method || 'GET',
        data: data,
        header: { 'Content-Type': 'application/json' },
    })
    return res;
}
const parseLrc = (lrc_content) => {
    let now_lrc = [];
    let lrc_row = lrc_content.split("\n");
    let scroll = true;
    for (let i in lrc_row) {
        if ((lrc_row[i].indexOf(']') == -1) && lrc_row[i]) {
            now_lrc.push({ lrc: lrc_row[i] });
        } else if (lrc_row[i] != "") {
            var tmp = lrc_row[i].split("]");
            for (let j in tmp) {
            scroll = false
            let tmp2 = tmp[j].substr(1, 8);
            tmp2 = tmp2.split(":");
            let lrc_sec = parseInt(tmp2[0] * 60 + tmp2[1] * 1);
            if (lrc_sec && (lrc_sec > 0)) {
                let lrc = (tmp[tmp.length - 1]).replace(/(^\s*)|(\s*$)/g, "");
                lrc && now_lrc.push({ lrc_sec: lrc_sec, lrc: lrc });
            }
            }
        }
    }
    if (!scroll) {
        now_lrc.sort(function (a, b) {
            return a.lrc_sec - b.lrc_sec;
        });
    }
    return {
        now_lrc: now_lrc,
        scroll: scroll
    };
}
const showUpdate = () => {
    wepy.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
    })
}
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const formatDuration = (duration) => {
    duration = new Date(duration);
    return formatNumber(duration.getMinutes()) + ":" + formatNumber(duration.getSeconds());
}
module.exports = {
    wxRequest,
    parseLrc,
    showUpdate,
    formatDuration
}