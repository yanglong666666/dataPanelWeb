let testOne = function() {
	Highcharts.chart('testOne', {
		chart: {
			type: 'pie',
			options3d: {
				enabled: true,
				alpha: 45
			}
		},
		title: {
			text: '简数科技每周水果消耗量'
		},
		subtitle: {
			text: 'Highcharts 中的3D环形图'
		},
		plotOptions: {
			pie: {
				innerSize: 100,
				depth: 45
			}
		},
		series: [{
			name: '货物金额',
			data: [
				['香蕉', 8],
				['猕猴桃', 3],
				['桃子', 1],
				['橘子', 6],
				['苹果', 8],
				['梨', 4],
				['柑橘', 4],
				['橙子', 1],
				['葡萄 (串)', 1]
			]
		}]
	});
}

let testTwo = function() {

	Highcharts.chart('container', {
		chart: {
			type: 'column',
			margin: 75,
			options3d: {
				enabled: true,
				alpha: 10,
				beta: 25,
				depth: 70,
				viewDistance: 100, // 视图距离，它对于计算角度影响在柱图和散列图非常重要。此值不能用于3D的饼图
				frame: { // Frame框架，3D图包含柱的面板，我们以X ,Y，Z的坐标系来理解，X轴与 Z轴所形成
					// 的面为bottom，Y轴与Z轴所形成的面为side，X轴与Y轴所形成的面为back，bottom、
					// side、back的属性一样，其中size为感官理解的厚度，color为面板颜色
					bottom: {
						size: 10
					},
					side: {
						size: 1,
						color: 'transparent'
					},
					back: {
						size: 1,
						color: 'transparent'
					}
				}
			},
		},
		title: {
			text: '包含空值的3D柱状图'
		},
		subtitle: {
			text: '请注意值为 0 和 null 的区别'
		},
		plotOptions: {
			column: {
				depth: 25
			}
		},
		xAxis: {
			categories: Highcharts.getOptions().lang.shortMonths
		},
		yAxis: {
			title: {
				text: null
			}
		},
		series: [{
			name: '销售',
			data: [2, 3, null, 4, 0, 5, 1, 4, 6, 3]
		}]
	});

}
