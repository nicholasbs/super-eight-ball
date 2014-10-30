$ ->
  ball.init()

  # test triggers
  $("body").on("click", ".trigger-set-text", ->
    ball.setText($(@).text())
  )

window.ball = {
  duration: 2200
  scaleVal: "scale(0.7)"

  init: ->
    @swayWrapper = $(".sway-wrapper")
    @el = $(".floater-wrapper")
    @text = @el.find(".text")
    @testText = $(".test-text-el")

    @pickPosition()
    setInterval(=>
      @pickPosition()
    , @duration)

  pickPosition: ->
    sway = 13
    top = Math.random() * sway - sway / 2
    left = Math.random() * sway - sway / 2

    @swayWrapper.css("transform", "translate(#{top}px, #{left}px)")

  fadeOut: ->
    @el.addClass("fade-out")
    @el.css("transform", "#{@randomSkew()} #{@scaleVal}")

  # turn off transition, pick random placement, fade in
  fadeIn: (text)->
    # disable the transition and set a new position
    @el.addClass("no-transition")
    @el.css("transform", "#{@randomSkew()} #{@scaleVal}")

    # trigger a redraw
    @el.css("transform")
    @el.removeClass("no-transition")

    # set the text properties
    if text?
      textHeight = @getTextHeight(text)
      textMargin = @scale(textHeight, 29, 87, 25, 0)
      @text.css("marginTop", textMargin)

    # trigger the animation
    @el.removeClass("fade-out")
    @el.css("transform", "skew(0, 0) scale(1)")

  setText: (text)->
    @fadeOut()

    setTimeout(=>
      @text.text(text)
      @fadeIn(text)
    , @duration * 1.5)

  randomSkew: ->
    skewMax = 20
    skew1 = Math.random() * skewMax - skewMax / 2
    skew2 = Math.random() * skewMax - skewMax / 2
    return "skew(#{skew1}deg, #{skew2}deg)"

  getTextHeight: (text)->
    @testText.text(text)
    return @testText.height()

  scale: (input, inMin, inMax, outMin, outMax)->
    # keep the input in bounds
    input = inMin if input < inMin
    input = inMax if input > inMax

    # convert the input to a percentage
    percent = ((input - inMin) * 100) / (inMax - inMin)

    # convert the percentage to the output scale
    return percent * ((outMax - outMin) / 100) + outMin
}
