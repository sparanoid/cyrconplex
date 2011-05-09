/*!

	http://jsdo.it/fingaholic/textShuffle

*/
/**
 * 
 * jquery.textShuffle.1.6.js
 * 
 * @version      1.6
 * @author       Playahata
 * @copyright    Playahata
 * @url          http://jsdo.it/playahata
 * @license      The MIT License
 * @comment      Depends on jQuery 1.4.3
 * 
 */


(function($){
  $.textShuffle = function(elem, options){
    this.options = $.extend({}, this.options, options);
    this.elem = elem;
    this.text = this.elem.text();
    this.fps = 1000 / this.options.fps;
    this.strRandomArray = this.options.randomText.split('');
    this.lenRandomArray = this.strRandomArray.length;
    this._setup();
  };
  $.extend($.textShuffle.prototype, {
    options : {
      onStart : true,
      typeWriter : false,
      typeWriterString : '_',
      onMouseOver : true,
      fixedDelay : 100,
      fps : 60,
      randomText : 'sparanoidSPARANOID0123456789!?#$%&/+-=;_-_-_-_-_-_-#$#$#$#$#$'
    },
    _setup : function(){
      var o = this.options;
      if(o.onStart) this.setEmptyString();
      if(o.onMouseOver) this._setMouseOverEvent();
    },
    _setRandomString : function(){
      var count = 1,
          len = this.text.length;
      var timer = setInterval($.proxy(function(){
        this.elem.text(
          this._returnRandomString(count)
        );
        count++;
        if (count === len + 1)
          clearInterval(timer),
          this.loopRandomString();
      }, this), this.fps);
    },
    _setDefaultString : function(){
      var count = 1,
          len = this.text.length,
          o = this.options;
      var timer = setInterval($.proxy(function(){
        var rests = (o.typeWriter) ?
          (len - count === 0) ?
            '' :
            o.typeWriterString :
          this._returnRandomString(len - count);
        this.elem.text(
          this.text.substring(0, count) +  rests
        );
        count++;
        if (count === len + 1)
          clearInterval(timer);
      }, this), this.fps);
    },
    _setMouseOverEvent : function(){
      var self = this;
      self.elem.bind('mouseenter', function(){
        if($(this).text() === self.text){
          (self.options.typeWriter) ? 
            self.setEmptyString() :
            self.loopRandomString();
        };
      });
    },
    _returnRandomString : function(len){
      var strRandomArray = [];
      for(var i=0; i<len; i++){
        var numRandom = Math.floor(Math.random() * this.lenRandomArray);
        strRandomArray[i] = this.strRandomArray[numRandom];
      };
      return strRandomArray.join('');
    },
    setEmptyString : function(){
      this.elem.text('');
      if(this.options.typeWriter){
        this._setDefaultString();
        return;
      };
      this._setRandomString();
    },
    loopRandomString : function(){
      var o = this.options;
      if(o.fixedDelay === 0){
        this._setDefaultString();
        return;
      };
      var len = this.text.length,
          flg = 1;
      var timerDelay = setTimeout(function(){
        flg = 0;
        clearTimeout(timerDelay);
      }, o.fixedDelay);
      var timerLoop = setInterval($.proxy(function(){
        if(!flg)
          clearInterval(timerLoop),
          this._setDefaultString();
        this.elem.text(
          this._returnRandomString(len)
        );
      }, this), this.fps);
    }
  });
  $.expr[':'].textShuffle = function(elem){
    return Boolean($.data(elem, 'textShuffle'));
  }; 
  $.fn.textShuffle = function(){
    var args = Array.prototype.slice.call(arguments),
        isMethodCall = (args.length > 0) && ($.type(args[0]) === 'string'),
        method = isMethodCall ? args[0] : undefined,
        options = isMethodCall ? undefined : args[0],
        returnValue = this;
    if(isMethodCall){
      this.each(function(){
        var $target = $(this),
            instance = $target.data('textShuffle'),
            res = instance[method].apply(instance, args.slice(1));
        if((res !== instance) && (res !== undefined)){
          returnValue = res;
        };
      });
    }else{
      this.each(function(){
        var $target = $(this),
            instance = new $.textShuffle($target, options);
        $target.data('textShuffle', instance);
      });
    };
    return returnValue;
  };
})(jQuery);
