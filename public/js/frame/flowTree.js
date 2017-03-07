/*
 * juqery.flowTree.js 轮播
 * author wangzhao
 * 调用方法 $(id).flowTree(option);
 *  Copyright (C) 2017-03-03
 */
;
(function(factory) {
    if(typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(jquery);
    }
}(function($) {
    var option = {
        width: null,
        height: null,
        number: null, //节点个数
        childNodesData: null, //节点数据
        clickEvent: null, //点击事件
        resize: null//窗口自适应
    };

    function FlowTree(el, opts) {
        var params = $.extend(true, option, opts);
        this.box = el;
        this.box_height = params.height;
        this.childNodeNumber = params.number;
        this.childNodesData = params.childNodesData;
        this.clickEvent = params.clickEvent;
        this.initTree();
        this.nodeClickEvent();
        this.resize = function(newHeight){
            console.log(this);
            // debugger
            $(this.box).find('.flowItem').css('height', Math.floor(newHeight / this.childNodeNumber));
        };
    }
    $.fn.flowTree = function(opts) {
        return new FlowTree(this.get(0), opts);
    };
    FlowTree.prototype = {
        initTree: function() {
            var nodeStr = '',
                allSingleData = [];
            $(this.box).append('<div class="flowTree"></div>');
            if(!this.childNodeNumber) return console.error('参数number缺失');
            //渲染每个节点
            if(!this.childNodesData) return console.error('参数childNodesData缺失');
            for(var i = 0, len = this.childNodesData.length; i < len; i++) {
                allSingleData.push(this.childNodesData[i]);
                this.childNodesData[i].flag = 'big'; //flag标识
                if(this.childNodesData[i].children) {
                    $.each(this.childNodesData[i].children, function(i, n) {
                        n.flag = 'middle';
                        allSingleData.push(n);
                    });
                }
            }
            for(var i = 0; i < this.childNodeNumber; i++) {
                var nodeStr2 = '',
                    nodeData = allSingleData[i];
                var firstClass = i==0 ? 'circle-active': '';
                if(nodeData.flag == 'big') {
                    nodeStr2 = '<span class="stepNumber">' + nodeData.stepText + '</span><span class="circle circle-big"><span class="circle-inside '+firstClass+'"></span></span>' + '<span class="yAxisline yAxisline-big"></span><span class="stepTitle stepTitle-big">' + nodeData.stepTitle + '</span>';
                } else if(nodeData.flag == 'middle') {
                    nodeStr2 = '<span class="circle circle-middle"><span class="circle-inside"></span></span><span class="yAxisline yAxisline-middle"></span><span class="stepTitle stepTitle-middle">' + nodeData.stepTitle + '</span>';
                }
                nodeStr += '<div class="flowItem" data-number="'+i+'" flag="'+nodeData.flag+'">' + nodeStr2 + '</div>';
            }
            $(this.box).find('.flowTree').html(nodeStr);
            $(this.box).find('.flowItem').css('height', Math.floor(this.box_height / this.childNodeNumber))
            $(this.box).find('.flowItem').last().find('.yAxisline').hide();
            $(this.box).find('.flowItem').first().attr('clicked', true);//默认第一个被点击过
        },
        nodeClickEvent: function() {
            var me = this;
            $(this.box).find('.flowItem').on('click', function() {
                console.log(me.clickEvent);
                me.clickEvent(this);
            });
        }
    };
}));
