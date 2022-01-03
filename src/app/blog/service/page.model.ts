export class MetaPage {
    constructor(
        public key: string = '',
        public title: string = '',
        public page: boolean = false,
        public isPrivate: boolean = false,
        public parent: string = '',
    ) { };
}

export class Page {

    constructor(
        public key: string = '',
        public contents: string = '',
        public datetimeIssued: Date = new Date(),
        public datetimeLastEdited: Date = new Date(),
        public tags: string[] = []
    ) { };

    IssuedDateStr() {
        if (this.datetimeIssued)
            return getDateString(this.datetimeIssued, "MMM.dd.yyyy(ddd) hh:mm tt");
        else
            return '';
    }

    LastEditedDateStr() {
        if (this.datetimeLastEdited)
            return getDateString(this.datetimeLastEdited, "MMM.dd.yyyy(ddd) hh:mm tt");
        else
            return '';
    }
}

export function getDateString(d: Date, formatstr: string) {
    if (!d.valueOf()) return "";

    const weekKorName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    const weekKorShortName = ["일", "월", "화", "수", "목", "금", "토"];
    const weekEngName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const weekEngShortName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthEngShortName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dev"];
    const monthEngName = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const eraString = ["B.C.", "A.D."];
    const eraStringShort = ["BC", "AD"];
    const AmpmKorString = ["오전", "오후"];
    const AmpmEngString = ["AM", "PM", "A", "P"]


    return formatstr.replace(
        /(Kdddd|Kddd|dddd|ddd|dd|d|fffffff|ffffff|fffff|ffff|fff|ff|f|FFFFFFF|FFFFFF|FFFFF|FFFF|FFF|FF|F|gg|g|HH|H|hh|h|K|zzz|zz|z|mm|m|MMMM|MMM|MM|M|ss|s}Ktt|Kt|tt|t|yyyy|yyy|yy|y)/g,
        (formatchar: string): string => {
            switch (formatchar) {
                // The name of the day of the week.
                case "Kdddd": return weekKorName[d.getDay()]; // Korean-long
                case "Kddd": return weekKorShortName[d.getDay()]; // Korean-abbreviated
                case "dddd": return weekEngName[d.getDay()]; // English-long
                case "ddd": return weekEngShortName[d.getDay()]; // English-abbreviated
                // The day of the month
                case "dd": return d.getDate().toString().padStart(2, "0"); // zero-padded day 01-31
                case "d": return d.getDate().toString(); // day 1-31
                // seconds under decimal point padded with 0
                case "fffffff": return d.getMilliseconds().toString().padEnd(7, "0");
                case "ffffff": return d.getMilliseconds().toString().padEnd(6, "0");
                case "fffff": return d.getMilliseconds().toString().padEnd(5, "0");
                case "ffff": return d.getMilliseconds().toString().padEnd(4, "0");
                case "fff": return d.getMilliseconds().toString().padEnd(3, "0");
                case "ff": return d.getMilliseconds().toString().substring(0, 2).padEnd(2, "0");
                case "f": return d.getMilliseconds().toString().substring(0, 1).padEnd(1, "0");
                // seconds under decimal point non-padded
                case "FFFFFFF":
                case "FFFFFF":
                case "FFFFF":
                case "FFFF":
                case "FFF": return d.getMilliseconds().toString();
                case "FF": return d.getMilliseconds().toString().substring(0, 2);
                case "F": return d.getMilliseconds().toString().substring(0, 1);
                // period of era AD/BC
                case "gg": return d.getFullYear() > 0 ? eraString[1] : eraString[0];
                case "g": return d.getFullYear() > 0 ? eraStringShort[1] : eraStringShort[0];
                // Hour 
                case "HH": return d.getHours().toString().padStart(2, "0"); // 24hr with zero padding
                case "H": return d.getHours().toString(); // 24hr without zero padding
                case "hh": return ((d.getHours() % 12) ? d.getHours() % 12 : 12).toString().padStart(2, "0"); // 12hr with zero padding
                case "hh": return ((d.getHours() % 12) ? d.getHours() % 12 : 12).toString(); // 12hr without zero padding
                // Timezone. ex) +00:00, -08:00, +01:30
                case "K":
                case "zzz": return ((d.getTimezoneOffset() >= 0) ? "+" : "-") +
                    (Math.floor(d.getTimezoneOffset() / 60)).toString().padStart(2, "0") + ":" +
                    (Math.floor(d.getTimezoneOffset() % 60)).toString().padStart(2, "0");
                case "zz": return ((d.getTimezoneOffset() >= 0) ? "+" : "-") +
                    (Math.floor(d.getTimezoneOffset() / 60)).toString().padStart(2, "0");
                case "z": return ((d.getTimezoneOffset() >= 0) ? "+" : "-") +
                    (Math.floor(d.getTimezoneOffset() / 60)).toString();
                // Minute
                case "mm": return d.getMinutes().toString().padStart(2, "0"); // zero-padded
                case "m": return d.getMinutes().toString(); // non-zero-padded
                // Month
                case "MMMM": return monthEngName[d.getMonth()]; // full month name
                case "MMM": return monthEngShortName[d.getMonth()]; // abbreviated month name
                case "MM": return (d.getMonth() + 1).toString().padStart(2, "0"); // zero padded month 01-12
                case "M": return (d.getMonth() + 1).toString(); // month 1-12
                // second
                case "ss": return d.getSeconds().toString().padStart(2, "0"); // zero-padded second 00-59
                case "s": return d.getSeconds().toString(); // second 0-59
                // AM/PM
                case "Ktt":
                case "Kt": return d.getHours() < 12 ? AmpmKorString[0] : AmpmKorString[1];  // Korean 오전/오후
                case "tt": return d.getHours() < 12 ? AmpmEngString[0] : AmpmEngString[1];  // English AM/PM
                case "t": return d.getHours() < 12 ? AmpmEngString[2] : AmpmEngString[3];   // English A/P
                // year
                case "yyyy": return d.getFullYear().toString().padStart(4, "0"); // Year as 4 digit
                case "yyy": return d.getFullYear().toString().padStart(4, "0"); // Year as minimum 3 digit. ex) 001, 090, 1900
                case "yy": return (d.getFullYear() % 1000).toString().padStart(2, "0"); // Year as 2 digit 00-99
                case "y": return (d.getFullYear() % 1000).toString(); // Year as 2 digit 0-99 (without zero padding)
                // others
                default: return formatchar;
            }
        });
}
