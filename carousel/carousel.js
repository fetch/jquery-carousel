/*!
 * Copyright (c) 2012 Fetch! http://www.fetch.nl
 *
 * This file is generated by `cake build`, do not edit it by hand.
 */
(function() {
  var Carousel;

  $.fn.extend({
    carousel: function(options) {
      return $(this).each(function() {
        var instance;
        if (instance = $(this).data('carousel-instance')) {
          if (typeof instance[options] === 'function') {
            return instance[options]();
          } else {
            return instance[options];
          }
        } else {
          return new Carousel(this, options);
        }
      });
    }
  });

  Carousel = (function() {

    Carousel.name = 'Carousel';

    function Carousel(element, options) {
      this.options = $.extend({}, {
        play: true,
        speed: 5000,
        direction: 'horizontal',
        displayInFrame: 1
      }, options);
      this.index = 0;
      this.instance = $(element);
      this.instance.data('carousel-instance', this);
      this.settings = {
        width: this.instance.width(),
        height: this.instance.height()
      };
      this.slides = $('.slide', this.instance);
      this.bullets = $('.controls .bullet', this.instance);
      if (this.options.direction === 'horizontal') {
        $('.slide', this.instance).width(this.instance.outerWidth());
        $('.frame', this.instance).width(this.instance.outerWidth() * this.options.displayInFrame);
        $('.slide,.frame', this.instance).height(this.instance.outerHeight());
      } else {
        $('.slide', this.instance).height(this.instance.outerHeight());
        $('.frame', this.instance).height(this.instance.outerHeight() * this.options.displayInFrame);
        $('.slide,.frame', this.instance).width(this.instance.outerWidth());
      }
      this.bindEvents();
      this.goToSlide(0);
      if (this.options.play) {
        this.play();
      }
    }

    Carousel.prototype.bindEvents = function() {
      var _this = this;
      return this.bullets.click(function(event) {
        var bullet;
        event.preventDefault();
        bullet = $(event.currentTarget);
        return _this.goToSlide(bullet.index());
      });
    };

    Carousel.prototype.nextSlide = function() {
      if (this.index + this.options.displayInFrame >= this.slides.length) {
        return this.goToSlide(0);
      } else {
        return this.goToSlide(this.index + 1);
      }
    };

    Carousel.prototype.prevSlide = function() {
      if (this.index - 1 < 0) {
        return this.goToSlide(this.slides.length);
      } else {
        return this.goToSlide(this.index - 1);
      }
    };

    Carousel.prototype.goToSlide = function(slide) {
      this.index = slide;
      if (this.bullets.length) {
        this.bullets.removeClass('current');
        this.bullets.eq(this.index).addClass('current');
      }
      this.slides.removeClass('current');
      this.slides.eq(this.index).addClass('current');
      if (this.options.direction === 'horizontal') {
        $('.slides', this.instance).animate({
          marginLeft: -(this.index * this.settings.width)
        });
      } else {
        $('.slides', this.instance).animate({
          marginTop: -(this.index * this.settings.height)
        });
      }
      if (this.options.play) {
        return this.play();
      }
    };

    Carousel.prototype.play = function() {
      var _this = this;
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      return this.timeout = setTimeout(function() {
        return _this.nextSlide();
      }, this.options.speed);
    };

    Carousel.prototype.stop = function() {
      this.options.play = false;
      if (this.timeout) {
        return clearTimeout(this.timeout);
      }
    };

    return Carousel;

  })();

}).call(this);
