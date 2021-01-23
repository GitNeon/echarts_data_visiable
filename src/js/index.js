window.onload = function () {
    initTimeShow();
    initIndustryEmploymentChart();
    initPersonChangeChart();
    initAgeDistributionChart();
    initEmploymentProportion();
    initViewCounts();
    initRegionalDistribution();
};


/* 初始化时间 */
function initTimeShow() {
    // 格式： 当前时间：2020年3月17-0时54分14秒
    let t = null;
    t = setTimeout(time, 1000);//開始运行
    function time() {
        clearTimeout(t);//清除定时器
        let dt = new Date();
        let y = dt.getFullYear();
        let mt = dt.getMonth() + 1;
        let day = dt.getDate();
        let h = dt.getHours();//获取时
        let m = dt.getMinutes();//获取分
        let s = dt.getSeconds();//获取秒
        document.querySelector("h4").innerHTML = '当前时间：' + y + "年" + mt + "月" + day + "-" + h + "时" + m + "分" + s + "秒";
        t = setTimeout(time, 1000); //设定定时器，循环运行
    }
}


/*
* 行业就业 - 柱状图初始化函数
* */
function initIndustryEmploymentChart() {
    let chartDom = document.querySelector('.chart-industry');
    let myChart = echarts.init(chartDom);
    let option;

    option = {
        color: ["#3398DB"],
        xAxis: {
            type: 'category',
            data: ['旅游行业', '教育培训', '游戏行业', '医疗行业', '电商行业', '社交行业', '金融行业'],
            axisTick: {
                alignWithLabel: true
            },
            axisLabel:{
                interval:0
            }
        },
        yAxis: {
            type: 'value',
            splitLine:{
                lineStyle: {
                    color: "rgba(255,255,255,.1)"
                }
            },
            // 修改刻度标签 相关样式
            axisLabel: {
                color: "rgba(255,255,255,.6) ",
                fontSize: 12
            },
            // y轴的线条改为了 2像素
            axisLine: {
                lineStyle: {
                    color: "rgba(255,255,255,.1)",
                    width: 2
                }
            }
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            top:"10px",
            containLabel: true
        },
        series: [{
            name:'直接访问',
            data: [200, 300, 300, 900, 1500, 1200, 600],
            type: 'bar',
            barWidth: "35%",
            showBackground: false,
            itemStyle: {
                // 修改柱子圆角
                barBorderRadius: 2
            }
        }]
    };

    option && myChart.setOption(option);

    window.addEventListener("resize", function() {
        myChart.resize();
    });
}

/*
* 折线图-人员变化
* */
function initPersonChangeChart() {
    let chartDom = document.querySelector('.chart-person-change');
    let myChart = echarts.init(chartDom);
    let option;

    let yearData = [
        {
            year: "2020", // 年份
            data: [
                // 两个数组是因为有两条线
                [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
                [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
            ]
        },
        {
            year: "2021", // 年份
            data: [
                // 两个数组是因为有两条线
                [123, 175, 112, 197, 121, 67, 98, 21, 43, 64, 76, 38],
                [143, 131, 165, 123, 178, 21, 82, 64, 43, 60, 19, 34]
            ]
        }
    ];

    option = {
        // 通过这个color修改两条线的颜色
        color: ["#00f2f1", "#ed3f35"],
        tooltip: {
            trigger: "axis"
        },
        legend: {
            // 如果series 对象有name 值，则 legend可以不用写data
            // 修改图例组件 文字颜色
            textStyle: {
                color: "#4c9bfd"
            },
            // 这个10% 必须加引号
            right: "10%"
        },
        grid: {
            top: "20%",
            left: "3%",
            right: "4%",
            bottom: "3%",
            show: true, // 显示边框
            borderColor: "#012f4a", // 边框颜色
            containLabel: true // 包含刻度文字在内
        },

        xAxis: {
            type: "category",
            boundaryGap: false,
            data: [
                "1月",
                "2月",
                "3月",
                "4月",
                "5月",
                "6月",
                "7月",
                "8月",
                "9月",
                "10月",
                "11月",
                "12月"
            ],
            axisTick: {
                show: false // 去除刻度线
            },
            axisLabel: {
                color: "#4c9bfd" // 文本颜色
            },
            axisLine: {
                show: false // 去除轴线
            }
        },
        yAxis: {
            type: "value",
            axisTick: {
                show: false // 去除刻度线
            },
            axisLabel: {
                color: "#4c9bfd" // 文本颜色
            },
            axisLine: {
                show: false // 去除轴线
            },
            splitLine: {
                lineStyle: {
                    color: "#012f4a" // 分割线颜色
                }
            }
        },
        series: [
            {
                name: "新增粉丝",
                type: "line",
                // true 可以让我们的折线显示带有弧度
                smooth: true,
                data: yearData[0].data[0]
            },
            {
                name: "新增游客",
                type: "line",
                smooth: true,
                data: yearData[0].data[1]
            }
        ]
    };

    option && myChart.setOption(option);

    window.addEventListener("resize", function() {
        myChart.resize();
    });

}

/*
* 饼状图 - 年龄分布
* */
function initAgeDistributionChart() {

    // 1. 实例化对象
    let myChart = echarts.init(document.querySelector(".chart-age-distribution"));
    // 2.指定配置
    let option = {
        color: ["#065aab", "#066eab", "#0682ab", "#0696ab", "#06a0ab"],
        tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },

        legend: {
            bottom: "0%",
            // 修改小图标的大小
            itemWidth: 10,
            itemHeight: 10,
            // 修改图例组件的文字为 12px
            textStyle: {
                color: "rgba(255,255,255,.5)",
                fontSize: "12"
            }
        },
        series: [
            {
                name: "年龄分布",
                type: "pie",
                // 这个radius可以修改饼形图的大小
                // radius 第一个值是内圆的半径 第二个值是外圆的半径
                radius: ["40%", "60%"],
                center: ["50%", "45%"],
                avoidLabelOverlap: false,
                // 图形上的文字
                label: {
                    show: false,
                    position: "center"
                },
                // 链接文字和图形的线是否显示
                labelLine: {
                    show: false
                },
                data: [
                    { value: 1, name: "0岁以下" },
                    { value: 4, name: "20-29岁" },
                    { value: 2, name: "30-39岁" },
                    { value: 2, name: "40-49岁" },
                    { value: 1, name: "50岁以上" }
                ]
            }
        ]
    };
    myChart.setOption(option);
    window.addEventListener("resize", function() {
        myChart.resize();
    });
}


/*
* 柱形图 - 就业比例
* */
function initEmploymentProportion() {
    let myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];
    // 1. 实例化对象
    let myChart = echarts.init(document.querySelector(".chart-employment-proportion"));
    // 2.指定配置
    let option = {
        grid: {
            top: "10%",
            left: "22%",
            bottom: "10%"
            // containLabel: true
        },
        // 不显示x轴的相关信息
        xAxis: {
            show: false
        },
        yAxis: [
            {
                type: "category",
                inverse: true,
                data: ["HTML5", "CSS3", "javascript", "VUE", "NODE"],
                // 不显示y轴的线
                axisLine: {
                    show: false
                },
                // 不显示刻度
                axisTick: {
                    show: false
                },
                // 把刻度标签里面的文字颜色设置为白色
                axisLabel: {
                    color: "#fff"
                }
            },
            {
                data: [702, 350, 610, 793, 664],
                inverse: true,
                // 不显示y轴的线
                axisLine: {
                    show: false
                },
                // 不显示刻度
                axisTick: {
                    show: false
                },
                // 把刻度标签里面的文字颜色设置为白色
                axisLabel: {
                    color: "#fff"
                }
            }
        ],
        series: [
            {
                name: "条",
                type: "bar",
                data: [70, 34, 60, 78, 69],
                yAxisIndex: 0,
                // 修改第一组柱子的圆角
                itemStyle: {
                    barBorderRadius: 20,
                    // 此时的color 可以修改柱子的颜色
                    color: function(params) {
                        // params 传进来的是柱子对象
                        // console.log(params);
                        // dataIndex 是当前柱子的索引号
                        return myColor[params.dataIndex];
                    }
                },
                // 柱子之间的距离
                barCategoryGap: 50,
                //柱子的宽度
                barWidth: 10,
                // 显示柱子内的文字
                label: {
                    show: true,
                    position: "inside",
                    // {c} 会自动的解析为 数据  data里面的数据
                    formatter: "{c}%"
                }
            },
            {
                name: "框",
                type: "bar",
                barCategoryGap: 50,
                barWidth: 15,
                yAxisIndex: 1,
                data: [100, 100, 100, 100, 100],
                itemStyle: {
                    color: "none",
                    borderColor: "#00c1de",
                    borderWidth: 3,
                    barBorderRadius: 15
                }
            }
        ]
    };
    myChart.setOption(option);
    window.addEventListener("resize", function() {
        myChart.resize();
    });
}

/*
* 折线图 - 播放量
* */
function initViewCounts() {
    let myChart = echarts.init(document.querySelector(".chart-view-counts"));
    let option = {
        tooltip: {
            trigger: "axis"
        },
        legend: {
            top: "0%",
            data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
            textStyle: {
                color: "rgba(255,255,255,.5)",
                fontSize: "12"
            }
        },

        grid: {
            left: "10",
            top: "30",
            right: "10",
            bottom: "10",
            containLabel: true
        },
        xAxis: [
            {
                type: "category",
                boundaryGap: false,
                // x轴更换数据
                data: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12",
                        "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24",
                        "25", "26", "26", "28", "29", "30"],
                // 文本颜色为rgba(255,255,255,.6)  文字大小为 12
                axisLabel: {
                    textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize: 12
                    }
                },
                // x轴线的颜色为   rgba(255,255,255,.2)
                axisLine: {
                    lineStyle: {
                        color: "rgba(255,255,255,.2)"
                    }
                }
            }
        ],
        yAxis: [
            {
                type: "value",
                axisTick: { show: false },
                axisLine: {
                    lineStyle: {
                        color: "rgba(255,255,255,.1)"
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize: 12
                    }
                },
                // 修改分割线的颜色
                splitLine: {
                    lineStyle: {
                        color: "rgba(255,255,255,.1)"
                    }
                }
            }
        ],
        series: [
            {
                name: "邮件营销",
                type: "line",
                smooth: true,
                // 单独修改当前线条的样式
                lineStyle: {
                    color: "#0184d5",
                    width: "2"
                },
                // 填充颜色设置
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                            {
                                offset: 0,
                                color: "rgba(1, 132, 213, 0.4)" // 渐变色的起始颜色
                            },
                            {
                                offset: 0.8,
                                color: "rgba(1, 132, 213, 0.1)" // 渐变线的结束颜色
                            }
                        ],
                        false
                    ),
                    shadowColor: "rgba(0, 0, 0, 0.1)"
                },
                // 设置拐点
                symbol: "circle",
                // 拐点大小
                symbolSize: 8,
                // 开始不显示拐点， 鼠标经过显示
                showSymbol: false,
                // 设置拐点颜色以及边框
                itemStyle: {
                    color: "#0184d5",
                    borderColor: "rgba(221, 220, 107, .1)",
                    borderWidth: 12
                },
                data: [30, 40, 30, 40, 30, 40, 30, 60, 20, 40, 30, 40, 30, 40, 30,
                       40, 30, 60, 20, 40, 30, 40, 30, 40, 30, 40, 20, 60, 50, 40
                ]
            },
            {
                name: "联盟广告",
                type: "line",
                smooth: true,
                lineStyle: {
                    normal: {
                        color: "#00d887",
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1,
                            [
                                {
                                    offset: 0,
                                    color: "rgba(0, 216, 135, 0.4)"
                                },
                                {
                                    offset: 0.8,
                                    color: "rgba(0, 216, 135, 0.1)"
                                }
                            ],
                            false
                        ),
                        shadowColor: "rgba(0, 0, 0, 0.1)"
                    }
                },
                // 设置拐点 小圆点
                symbol: "circle",
                // 拐点大小
                symbolSize: 5,
                // 设置拐点颜色以及边框
                itemStyle: {
                    color: "#00d887",
                    borderColor: "rgba(221, 220, 107, .1)",
                    borderWidth: 12
                },
                // 开始不显示拐点， 鼠标经过显示
                showSymbol: false,
                data: [130, 10, 20, 40, 30, 40, 80, 60, 20, 40, 90, 40, 20,
                        140, 30, 40, 130, 20, 20, 40, 80, 70, 30, 40, 30, 120,20,
                        99, 50, 20
                ]
            }
        ]
    };
    myChart.setOption(option);
    // 4. 让图表跟随屏幕自动的去适应
    window.addEventListener("resize", function() {
        myChart.resize();
    });
}

/*
* 地区分布
* */
function initRegionalDistribution() {
    let myChart = echarts.init(document.querySelector(".chart-regional-distribution"));
    let option = {
        legend: {
            top: "90%",
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                color: "rgba(255,255,255,.5)",
                fontSize: "12"
            }
        },
        tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        // 注意颜色写的位置
        color: [
            "#006cff",
            "#60cda0",
            "#ed8884",
            "#ff9f7f",
            "#0096ff",
            "#9fe6b8",
            "#32c5e9",
            "#1d9dff"
        ],
        series: [
            {
                name: "点位统计",
                type: "pie",
                // 如果radius是百分比则必须加引号
                radius: ["10%", "70%"],
                center: ["50%", "42%"],
                roseType: "radius",
                data: [
                    { value: 20, name: "云南" },
                    { value: 26, name: "北京" },
                    { value: 24, name: "山东" },
                    { value: 25, name: "河北" },
                    { value: 20, name: "江苏" },
                    { value: 25, name: "浙江" },
                    { value: 30, name: "深圳" },
                    { value: 42, name: "广东" }
                ],
                // 修饰饼形图文字相关的样式 label对象
                label: {
                    fontSize: 10
                },
                // 修饰引导线样式
                labelLine: {
                    // 连接到图形的线长度
                    length: 10,
                    // 连接到文字的线长度
                    length2: 10
                }
            }
        ]
    };
    myChart.setOption(option);
    // 监听浏览器缩放，图表对象调用缩放resize函数
    window.addEventListener("resize", function() {
        myChart.resize();
    });
}