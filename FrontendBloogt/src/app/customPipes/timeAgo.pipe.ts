import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'GetTimeAgoOfDate',
  pure: false
})




export class TimeAgo implements PipeTransform {

  

 

  transform(date : Date) : string{
    let cutContent = this.getFun(date);

    return cutContent;
  }

  private getTickCount( value: Date | number | string = Date.now() ): number {
		if ( typeof( value ) === "number" ) {
			return( value );
		}
		return( new Date( value ).getTime() );
	}
  
  getFun(date :Date) : string {

    var MS_SECOND = 1000;
    var MS_MINUTE = ( MS_SECOND * 60 );
    var MS_HOUR = ( MS_MINUTE * 60 );
    var MS_DAY = ( MS_HOUR * 24 );
    var MS_MONTH = ( MS_DAY * 30 ); // Rough estimate.
    var MS_YEAR = ( MS_DAY * 365 ); // Rough estimate.
    var FROM_NOW_JUST_NOW = ( MS_SECOND * 44 );
    var FROM_NOW_MINUTE = ( MS_SECOND * 89 );
    var FROM_NOW_MINUTES = ( MS_MINUTE * 44 );
    var FROM_NOW_HOUR = ( MS_MINUTE * 89 );
    var FROM_NOW_HOURS = ( MS_HOUR * 21 );
    var FROM_NOW_DAY = ( MS_HOUR * 35 );
    var FROM_NOW_DAYS = ( MS_DAY * 25 );
    var FROM_NOW_MONTH = ( MS_DAY * 45 );
    var FROM_NOW_MONTHS = ( MS_DAY * 319 );
    var FROM_NOW_YEAR = ( MS_DAY * 547 );

      var nowTick = this.getTickCount();
		  var valueTick = this.getTickCount(date);
		  var delta = ( nowTick - valueTick );
    if ( delta <= FROM_NOW_JUST_NOW ) {

			return( "a few seconds ago" );

		} else if ( delta <= FROM_NOW_MINUTE ) {

			return( "a minute ago" );

		} else if ( delta <= FROM_NOW_MINUTES ) {

			return( Math.ceil( delta / MS_MINUTE ) + " minutes ago" );

		} else if ( delta <= FROM_NOW_HOUR ) {

			return( "an hour ago" );

		} else if ( delta <= FROM_NOW_HOURS ) {

			return( Math.ceil( delta / MS_HOUR ) + " hours ago" );

		} else if ( delta <= FROM_NOW_DAY ) {

			return( "a day ago" );

		} else if ( delta <= FROM_NOW_DAYS ) {

			return( Math.ceil( delta / MS_DAY ) + " days ago" );

		} else if ( delta <= FROM_NOW_MONTH ) {

			return( "a month ago" );

		} else if ( delta <= FROM_NOW_MONTHS ) {

			return( Math.ceil( delta / MS_MONTH ) + " months ago" );

		} else if ( delta <= FROM_NOW_YEAR ) {

			return( "a year ago" );

		} else {

			return( Math.ceil( delta / MS_YEAR ) + " years ago" );

		}

	}
  
}
