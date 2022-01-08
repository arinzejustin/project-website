import { AfterViewInit, Component, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import * as $ from 'jquery';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { faAngular } from '@fortawesome/free-brands-svg-icons';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { HttpClient } from '@angular/common/http';

@Component(
  {
    selector: 'app-ng',
    templateUrl: './app.component.html',
    styleUrls: [
      './app.component.css',
      './main.css'
    ],
    encapsulation: ViewEncapsulation.None,
    styles: [`
    .my-custom-class .tooltip-inner {
      background-color: darkgreen;
      font-size: 125%;
    }
    .my-custom-class .arrow::before {
      border-top-color: darkgreen;
    }
    .feedback {
      position: fixed;
      bottom: 0;
      right: 10px;
      border-radius: 4px 4px 0px 0px;
      padding: 10px;
      color: #FFF;
      cursor: pointer;
    }
  `]
  }
)
export class AppComponent implements OnInit, AfterViewInit {

  constructor(private renderer: Renderer2, private http: HttpClient) { }

  title = 'Download my projects zipped folder';
  ipAddress = '';
  faAng = faAngular;
  faClose = faTimesCircle;

  ngOnInit() {
    (function () {
      var previousScroll = 0;
      $(window).scroll(function () {
        var currentScroll: any = $(this).scrollTop();
        if (currentScroll < previousScroll) {
          $('.toolbar').css('transition', '4s all cubic-bezier(0.82, 0.65, 0.25, 0.55)')
          $('.toolbar').css('position', 'fixed');
        } else {
          $('.toolbar').css('position', 'absolute');
        }
        previousScroll = currentScroll;
      });
    }())
    var sec: number = 1000;
    $('body').append('<div class="feedback bg-secondary f-16">Feedback  <i fa fa-comment></i></div>');
    $('.feedback').click(function () {
      $('.rate-container').animate({
        bottom: "10px"
      }, sec)
    })
    $('.close-banner').click(function (event) {
      event.preventDefault();
      $('.rate-container').animate({
        bottom: "-1000000%"
      }, sec)
    })
    $('#post-rate').click(function (event) {
      event.preventDefault();
      submit();
      $('.star-widget').hide();
      $('.post').show()
    })
    $('.edit').click(function () {
      $('.star-widget').show();
      $('.post').hide()
    })
    $('.zip').each(function () {
      $(this).on('click', function (event) {
        event.preventDefault();

        $('body').css('overflow-y', 'hidden');
        var href = $(this).attr('href');
        var name = $(this).attr('data-name');

        function com() {
          $('#compile').text('compiling and zipping ' + name)
        }

        function down() {
          $('#down').text('Downloading and closing terminal');
        }

        function close() {
          $('.ter-holder').css('display', 'none');
          $('body').css('overflow-y', 'auto')
          window.open(href + '.zip', '_blank');
          clearAll()
        }

        $('.ter-holder').css('display', 'block');
        $('#run').text('Run install ' + name + ' zipped folder');

        const comPile = setTimeout(com, 1500);
        const downLoad = setTimeout(down, 2700);
        const closeTerminal = setTimeout(close, 3500);

        function clearAll() {
          clearTimeout(comPile);
          clearTimeout(downLoad);
          clearTimeout(closeTerminal);
          $('#run').text('');
          $('#compile').text('');
          $('#down').text('')
        }
      })
    })
    $('#ter-close').click(function () {
      $('.ter-holder').css('display', 'none')
    })
    this.getIPAddress();

    var submit = function () {
      /****
       * @param submit the feedback respone to the backend php script
       */
      var m = $('#m').val();
      $.ajax({
        type: "POST",
        url: "/feedback.php",
        data: "m=" + m
      })
    }
  }
  ngAfterViewInit() {
    var loader = this.renderer.selectRootElement('.loader-bg');
    this.renderer.setStyle(loader, 'width', '0');
    this.renderer.setStyle(loader, 'height', '0');
  }
  getIPAddress() {
    this.http.get("https://develop.arinzejustinng.com.ng/api/?format=json").subscribe((res: any) => {
      this.ipAddress = res.ip;
    });
  }
}


export class NgbdTooltipDelay {
}
