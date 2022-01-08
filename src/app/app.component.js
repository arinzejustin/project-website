"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
    d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NgbdTooltipDelay = exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var $ = require("jquery");
var free_brands_svg_icons_1 = require("@fortawesome/free-brands-svg-icons");
var free_regular_svg_icons_1 = require("@fortawesome/free-regular-svg-icons");
var AppComponent = /** @class */ (function () {
  function AppComponent(renderer, http) {
    this.renderer = renderer;
    this.http = http;
    this.title = 'Download my projects zipped folder';
    this.ipAddress = '';
    this.faAng = free_brands_svg_icons_1.faAngular;
    this.faClose = free_regular_svg_icons_1.faTimesCircle;
  }
  AppComponent.prototype.ngOnInit = function () {
    (function () {
      var previousScroll = 0;
      $(window).scroll(function () {
        var currentScroll = $(this).scrollTop();
        if (currentScroll < previousScroll) {
          $('.toolbar').css('transition', '4s all cubic-bezier(0.82, 0.65, 0.25, 0.55)');
          $('.toolbar').css('position', 'fixed');
        } else {
          $('.toolbar').css('position', 'absolute');
        }
        previousScroll = currentScroll;
      });
    }());
    var sec = 1000;
    $('body').append('<div class="feedback bg-secondary f-16">Feedback  <i fa fa-comment></i></div>');
    $('.feedback').click(function () {
      $('.rate-container').animate({
        bottom: "10px"
      }, sec);
    });
    $('.close-banner').click(function (event) {
      event.preventDefault();
      $('.rate-container').animate({
        bottom: "-1000000%"
      }, sec);
    });
    $('#post-rate').click(function (event) {
      event.preventDefault();
      $('.star-widget').hide();
      $('.post').show();
    });
    $('.edit').click(function () {
      $('.star-widget').show();
      $('.post').hide();
    });
    $('.zip').each(function () {
      $(this).on('click', function (event) {
        event.preventDefault();
        var href = $(this).attr('href');
        $('.ter-holder').css('display', 'block');
        alert(href);
      });
    });
    $('#ter-close').click(function () {
      $('.ter-holder').css('display', 'none');
    });
    this.getIPAddress();
  };
  AppComponent.prototype.ngAfterViewInit = function () {
    var loader = this.renderer.selectRootElement('.loader-bg');
    this.renderer.setStyle(loader, 'width', '0');
    this.renderer.setStyle(loader, 'height', '0');
  };
  AppComponent.prototype.getIPAddress = function () {
    var _this = this;
    this.http.get("http://api.ipify.org/?format=json").subscribe(function (res) {
      _this.ipAddress = res.ip;
    });
  };
  AppComponent = __decorate([
    (0, core_1.Component)({
      selector: 'app-ng',
      templateUrl: './app.component.html',
      styleUrls: [
        './app.component.css',
        './main.css'
      ],
      encapsulation: core_1.ViewEncapsulation.None,
      styles: ["\n    .my-custom-class .tooltip-inner {\n      background-color: darkgreen;\n      font-size: 125%;\n    }\n    .my-custom-class .arrow::before {\n      border-top-color: darkgreen;\n    }\n    .feedback {\n      position: fixed;\n      bottom: 0;\n      right: 10px;\n      border-radius: 4px 4px 0px 0px;\n      padding: 10px;\n      color: #FFF;\n      cursor: pointer;\n    }\n  "]
    })
  ], AppComponent);
  return AppComponent;
}());
exports.AppComponent = AppComponent;
var NgbdTooltipDelay = /** @class */ (function () {
  function NgbdTooltipDelay() {}
  return NgbdTooltipDelay;
}());
exports.NgbdTooltipDelay = NgbdTooltipDelay;
