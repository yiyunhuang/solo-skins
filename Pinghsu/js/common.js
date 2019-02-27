/*
 * Solo - A small and beautiful blogging system written in Java.
 * Copyright (c) 2010-2019, b3log.org & hacpai.com
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
/**
 * @fileoverview util and every page should be used.
 *
 * @author <a href="http://vanessa.b3log.org">Liyuan Li</a>
 * @version 0.3.0.0, Dev 17, 2018
 */

/**
 * @description 皮肤脚本
 * @static
 */
var Skin = {
  _initCommon: function ($goTop) {
    $(window).scroll(function () {
      if ($(window).scrollTop() > 125) {
        $goTop.show()
      } else {
        $goTop.hide()
      }

      if ($('.side .b3-solo-list').length > 0) {
        if ($(window).scrollTop() > 50) {
          $('.side').css('position', 'fixed')
        } else {
          $('.side').css('position', 'initial')
        }
      }
    })
  },
  init: function () {
    var header = new Headroom($('header')[0], {
      tolerance: 0,
      offset: 70,
      classes: {
        initial: 'header',
        pinned: 'header--down',
        unpinned: 'header--up',
        top: 'header',
        notTop: 'header',
        bottom: 'header',
        notBottom: 'header',
      },
    })
    header.init()

    Util.initPjax(function () {
      if ($('#articlePage').length === 0) {
        $('.b3-solo-list').closest('.module').remove()
      }
    })

    $('body').on('click', '.content-reset img', function () {
      window.open(this.src)
    })

    this._initCommon($('.icon__up'))

    $('.header__nav a, .header__m a').each(function () {
      if (this.href === location.href) {
        this.className = 'current'
      }
    }).click(function () {
      $('.header__nav a, .header__m a').removeClass('current')
      this.className = 'current'
      $('.header__m .module__list').hide()
    })

    $('.header__logo').click(function () {
      $('.header__nav a, .header__m a').removeClass('current')
    })
  },
  _initArticleCommon: function () {
    if ($(window).width() > 768) {
      if ($('#articlePage .b3-solo-list li').length === 0) {
        $('.side .b3-solo-list').closest('.module').remove()
        $('.side').css({
          height: 'auto',
          position: 'initial',
        })
        return
      }

      $('#articlePage').width($('.main').width() - 310)
      if ($('.side .b3-solo-list').length === 0) {
        $('.side').
          prepend('<div class="module"><div class="module__list"></div></div>').
          css({
            right: ($(window).width() - $('.main').width()) / 2,
            position: 'fixed',
            overflow: 'auto',
            height: $(window).height() - 30,
            top: 30,
          })
      }
      $('.side .module:eq(0) .module__list').html($('.b3-solo-list'))
      $(window).scroll()
      $('.side').scrollTop(0)
    } else {
      if ($('#articlePage .b3-solo-list li').length === 0) {
        $('.header__m .icon__list').hide().next().hide()
        return
      }
      $('.header__m .icon__list').show().next().html($('.b3-solo-list'))
      $('.b3-solo-list a').click(function () {
        $(this).closest('.module__list').hide()
      })
    }
  },
  initArticle: function () {
    this._initArticleCommon()

    setTimeout(function () {
      if ($('#externalRelevantArticlesWrap li').length === 0) {
        $('#externalRelevantArticlesWrap').next().remove()
        $('#externalRelevantArticlesWrap').remove()
      }

      if ($('#relevantArticlesWrap li').length === 0) {
        $('#relevantArticlesWrap').prev().remove()
        $('#relevantArticlesWrap').remove()
      }

      if ($('#randomArticlesWrap li').length === 0) {
        $('#randomArticlesWrap').prev().remove()
        $('#randomArticlesWrap').remove()
      }
    }, 1000)
  },
}
Skin.init()