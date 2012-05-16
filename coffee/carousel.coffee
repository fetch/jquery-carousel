$.fn.extend
  carousel: (options) ->
    $(this).each ->
      if instance = $(this).data 'carousel-instance'
        if typeof instance[options] == 'function'
          instance[options]()
        else
          return instance[options]
      else
        return new Carousel(this, options)


class Carousel
  
  constructor: (element, options) ->
    @options = $.extend {}, 
      play: true
      speed: 5000
      direction: 'horizontal'
      displayInFrame: 1
    , options
    
    @index = 0
    @instance = $(element)
    @instance.data 'carousel-instance', this
    @settings = 
      width: @instance.width()
      height: @instance.height()
      
    @slides = $('.slide', @instance)
    @bullets = $('.controls .bullet', @instance)
    
    if @options.direction == 'horizontal'
      $('.slide', @instance).width @instance.outerWidth()
      $('.frame', @instance).width @instance.outerWidth() * @options.displayInFrame
      $('.slide,.frame', @instance).height @instance.outerHeight()
    else
      $('.slide', @instance).height @instance.outerHeight()
      $('.frame', @instance).height @instance.outerHeight() * @options.displayInFrame
      $('.slide,.frame', @instance).width @instance.outerWidth()

    this.bindEvents()
    this.goToSlide 0
    this.play() if @options.play

  bindEvents: ->
    @bullets.click (event) =>
      event.preventDefault()
      bullet = $(event.currentTarget)
      this.goToSlide bullet.index()
      

  nextSlide: ->
    if @index + @options.displayInFrame >= @slides.length
      this.goToSlide 0
    else
      this.goToSlide @index + 1

  prevSlide: ->
    if @index - 1 < 0
      this.goToSlide @slides.length
    else
      this.goToSlide @index - 1

  goToSlide: (slide) ->
    @index = slide
    if @bullets.length
      @bullets.removeClass 'current'
      @bullets.eq(@index).addClass 'current'
    
    @slides.removeClass 'current'
    @slides.eq(@index).addClass 'current'
    
    if @options.direction == 'horizontal'
      $('.slides', @instance).animate
        marginLeft: - ( @index * @settings.width )
    else
      $('.slides', @instance).animate
        marginTop: - ( @index * @settings.height )
    
    this.play() if @options.play
    

  play: ->
    clearTimeout @timeout if @timeout
    @timeout = setTimeout =>
      this.nextSlide()
    , @options.speed
    
  stop: ->
    @options.play = false
    clearTimeout @timeout if @timeout
