/**
 * 流程图 只能一步步点击
 */
define(['jquery', 'flowTree'], function($) {
    //数据
    var flowChildData = [{
        stepText: 'Step 1',
        stepTitle: '行业研究',
        children: [{
            stepTitle: '1-B'
        }, {
            stepTitle: '1-C'
        }, {
            stepTitle: '1-D'
        }, {
            stepTitle: '1-E'
        }, {
            stepTitle: '1-F'
        }]
    }, {
        stepText: 'Step 2',
        stepTitle: '数据展示'
    }, {
        stepText: 'Step 3',
        stepTitle: '行业分析'
    }, {
        stepText: 'Step 4',
        stepTitle: '行业研究',
        children: [{
            stepTitle: '4-B'
        }]
    }, {
        stepText: 'Step 5',
        stepTitle: '行业估值',
        children: [{
            stepTitle: '5-B'
        }]
    }];
    var flow;
    flow = $('.flowBox').flowTree({
        number: 12,
        height: $(window).height(),
        childNodesData: flowChildData,
        clickEvent: function(node) {
            console.log(node);
            var $node = $(node), //当前
                $box = $(this.box);
            var last = $('.circle-active, .circle-active-middle').parents('.flowItem').attr('data-number');//刚点击过的index
            var number = $node.attr('data-number');//正在点击的index
            if($node.attr('clicked')) {
                if($('.circle-active, .circle-active-middle').parents('.flowItem').attr('flag') == 'big') {
                    $('.circle-active').addClass('circle-over');
                } else {
                    $('.circle-active-middle').addClass('circle-over-middle');
                }
                $box.find('.circle-inside').removeClass('circle-active').removeClass('circle-active-middle');
                if($node.attr('flag') == 'big') {
                    $node.find('.circle-inside').removeClass('circle-over').addClass('circle-active');
                } else {
                    $node.find('.circle-inside').removeClass('circle-over-middle').addClass('circle-active-middle');
                }
            } else {
                //没有点击过的 增加class
                if(number - $('.flowItem[clicked=true]').last().attr('data-number') > 1) {
                    alert('为了更好的体验，只能能按步骤顺序点击');
                    return;
                } else {
                    $box.find('.circle-inside').removeClass('circle-active').removeClass('circle-active-middle');
                    if($node.attr('flag') == 'big') {
                        $node.find('.circle-inside').addClass('circle-active');
                    } else {
                        $node.find('.circle-inside').addClass('circle-active-middle');
                    }
                    if($box.find('.flowItem').eq(last).attr('flag') == 'big') {
                        $box.find('.flowItem').eq(last).find('.circle-inside').addClass('circle-over');
                    } else {
                        $box.find('.flowItem').eq(last).find('.circle-inside').addClass('circle-over-middle');
                    }
                    $node.attr('clicked', true);
                }
            }
        }
    });
    $(window).resize(function() {
        var newHeight = $(window).height();
        flow.resize(newHeight);
    });
});
