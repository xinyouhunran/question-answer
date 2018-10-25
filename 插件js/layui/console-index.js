//layui初始化代码
layui.use('element', function() {
    var element = layui.element;

});


//获取当前时间和前几天，格式YYYY-MM-DD
function getDay(day) {
    var today = new Date();
    var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
    today.setTime(targetday_milliseconds); //这行是关键代码
    var tYear = today.getFullYear();
    var tMonth = today.getMonth();
    var tDate = today.getDate();
    tMonth = doHandleMonth(tMonth + 1);
    tDate = doHandleMonth(tDate);
    return tYear + "-" + tMonth + "-" + tDate;
}

function getMonth(day) {
    var today = new Date();
    var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
    today.setTime(targetday_milliseconds); //这行是关键代码
    var tYear = today.getFullYear();
    var tMonth = today.getMonth();
    tMonth = doHandleMonth(tMonth + 1);
    return tYear + "-" + tMonth;
}

function doHandleMonth(month) {
    var m = month;
    if (month.toString().length == 1) {
        m = "0" + month;
    }
    return m;
}

function setDate(startDayId, endDayId, startMonthId, endMonthId) {
    $(startDayId).val(getDay(-14));
    $(endDayId).val(getDay(0));
    $(startMonthId).val(getMonth(0));
    $(endMonthId).val(getMonth(0));
}

function layerDate(dateIdEnd, dateIdStart, monthIdEnd, monthIdStart) {

    layui.use(['form', 'laydate'], function() {
        var form = layui.form;
        var laydate = layui.laydate;
        var endDate = laydate.render({
            elem: dateIdEnd, //选择器结束时间
            type: 'date',
            position: 'abolute',
            // value: getDay(0),
            min: getDay(-365), //设置min默认最小值
            max: getDay(0), //设置一个默认最大值
            done: function(value, date) {
                startDate.config.max = {
                    year: date.year,
                    month: date.month - 1, //关键
                    date: date.date
                }
            }
        });
        //日期范围
        var startDate = laydate.render({
            elem: dateIdStart,
            type: 'date',
            position: 'abolute',
            // value: getDay(-14),
            min: getDay(-365), //设置min默认最小值
            max: getDay(0), //设置一个默认最大值
            done: function(value, date) {
                endDate.config.min = {
                    year: date.year,
                    month: date.month - 1, //关键
                    date: date.date
                };
            }
        });

        //年月选择器(结束月份)
        var endMonth = laydate.render({
            elem: monthIdEnd, //选择器结束时间
            type: 'month',
            position: 'abolute',
            // value: getMonth(0),
            max: getMonth(0), //设置一个默认最大值
            done: function(value, date) {
                startMonth.config.max = {
                    year: date.year,
                    month: date.month - 1, //关键
                }
            }
        });
        //年月选择器(开始月份)
        var startMonth = laydate.render({
            elem: monthIdStart,
            type: 'month',
            position: 'abolute',
            // value: getMonth(-14),
            max: getMonth(0), //设置一个默认最大值
            done: function(value, date) {
                endMonth.config.min = {
                    year: date.year,
                    month: date.month - 1, //关键
                };
            }
        });

    });

}

//导出当前页
function export_cur(id) {
    $(id).click(function() {
        $('.layui-table-box').eq(0).tableExport({
            type: 'excel',
            excelstyles: ['border-bottom', 'border-top', 'border-left', 'border-right']
        });
    })
}

//导出所有页
function export_all(id) {
    $(id).click(function() {
        $('.layui-table-box').eq(1).tableExport({
            type: 'excel',
            excelstyles: ['border-bottom', 'border-top', 'border-left', 'border-right']
        });
    })
}