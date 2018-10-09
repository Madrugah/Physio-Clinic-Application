"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var devextreme_angular_1 = require('devextreme-angular');
var forms_1 = require('@angular/forms');
var query_1 = require('devextreme/data/query');
if (!/localhost/.test(document.location.host)) {
    core_1.enableProdMode();
}
var TestSchedulerComponent = (function () {
    function TestSchedulerComponent(service) {
        this.currentDate = new Date(2015, 4, 25);
        this.first = true;
        this.Hours = [
            '12',
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11'
        ];
        this.appointmentForm = new forms_1.FormGroup({
            name: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(100)]),
            authorName: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(100)]),
            location: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(100)]),
            startHour: new forms_1.FormControl()
        });
        this.data = service.getData();
        this.moviesData = service.getMoviesData();
        this.theatreData = service.getTheatreData();
        // this.scheduler.instance.showAppointmentPopup(null, false);
    }
    TestSchedulerComponent.prototype.ngOnInit = function () {
    };
    TestSchedulerComponent.prototype.onContentReady = function () {
        //console.log("ready");
        setTimeout(this.GO(), 5000);
    };
    TestSchedulerComponent.prototype.GO = function () {
        // if(this.first){
        //     this.scheduler.instance.showAppointmentPopup(this.data[0], false);
        //     this.scheduler.instance.hideAppointmentPopup(false);
        //     this.first=false;
        // }
    };
    TestSchedulerComponent.prototype.onAppointmentFormCreated = function (data) {
        //console.log();
        // list.removeChild(list.childNodes[0]);           // Remove <ul>'s first child node (index 0)
        // if(this.first){
        //     this.first=false;
        //     var bottom = document.getElementsByClassName("dx-toolbar-items-container");
        //     (<HTMLElement>bottom[0]).style.visibility='hidden';
        //     var v = document.getElementsByClassName("dx-overlay-content dx-popup-normal dx-popup-draggable dx-resizable");
        //     //console.log(v);
        //     var str = '';
        //     //v[0].innerHTML=str;
        //     while (v[0].firstChild) {
        //         v[0].removeChild(v[0].firstChild);
        //     }
        //     this.scheduler.instance.hideAppointmentPopup(false);
        // }
        //console.log(data);
        var that = this, form = data.form;
        form.option("items", [{
                label: {
                    text: "Director"
                },
                name: "director",
                editorType: "dxTextBox"
            }]);
        //var x = document.getElementsByClassName("dx-box-flex dx-widget dx-visibility-change-handler dx-collection dx-box");
        var x = document.getElementsByClassName("dx-overlay-content dx-popup-normal dx-popup-draggable dx-resizable");
        var HTMLForm = document.getElementById("myForm");
        //var HTMLHolder = document.getElementById("myHolder");
        // var str = '';
        // x[0].innerHTML=str;
        x[0].appendChild(HTMLForm);
        // var bottom = document.getElementsByClassName("dx-toolbar-items-container");
        // (<HTMLElement>bottom[0]).style.visibility='hidden';
        var v = document.getElementsByClassName("dx-overlay-content dx-popup-normal dx-popup-draggable dx-resizable");
        //console.log(v);
        var str = '';
        while (v[0].firstChild) {
            v[0].removeChild(v[0].firstChild);
        }
        v[0].appendChild(HTMLForm);
        //v[0].innerHTML=str;
        //(<HTMLElement>v[0]).style.visibility='hidden';
        //         if(this.first){
        //             //console.log("first");
        //             this.first=false;
        //             this.scheduler.instance.hideAppointmentPopup(false);
        // //             this.scheduler.instance.showAppointmentPopup(data.appointmentData, false);
        //         }
    };
    TestSchedulerComponent.prototype.onFormSubmit = function (save) {
        var HTMLForm = document.getElementById("myForm");
        var HTMLHolder = document.getElementById("myHolder");
        HTMLHolder.appendChild(HTMLForm);
        this.scheduler.instance.hideAppointmentPopup(false);
    };
    TestSchedulerComponent.prototype.onAppointmentAdding = function (data) {
        //console.log("hello");
    };
    TestSchedulerComponent.prototype.editDetails = function (showtime) {
        this.scheduler.instance.showAppointmentPopup(this.getDataObj(showtime), false);
    };
    TestSchedulerComponent.prototype.getDataObj = function (objData) {
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].startDate.getTime() === objData.startDate.getTime() && this.data[i].theatreId === objData.theatreId)
                return this.data[i];
        }
        return null;
    };
    TestSchedulerComponent.prototype.getMovieById = function (id) {
        return query_1["default"](this.moviesData).filter(["id", "=", id]).toArray()[0];
    };
    __decorate([
        core_1.ViewChild(devextreme_angular_1.DxSchedulerComponent)
    ], TestSchedulerComponent.prototype, "scheduler");
    TestSchedulerComponent = __decorate([
        core_1.Component({
            selector: 'app-test-scheduler',
            templateUrl: './test-scheduler.component.html',
            styleUrls: ['./test-scheduler.component.css',
                "../../../../node_modules/devextreme/dist/css/dx.common.css",
                "../../../../node_modules/devextreme/dist/css/dx.light.css"]
        })
    ], TestSchedulerComponent);
    return TestSchedulerComponent;
}());
exports.TestSchedulerComponent = TestSchedulerComponent;
//   appointmentsData: Appointment[];
//   currentDate: Date = new Date(2017, 4, 25);
//   constructor() {
//     this.appointmentsData=appointments;
//   }
//   ngOnInit() {
//   }
//   onCellClick(x:any){
//     //console.log(x);
//   }  
//   onAppointmentClick(x:any){
//     //console.log(x);
//   }
//   /*showAppointmentPopup(x, y){
//       //console.log(x);
//       //console.log(y);
//   } //*/ 
//   showAppointmentPopup(x, y, z){
//       //console.log(x);
//       //console.log(y);
//   }//*/
//   onAppointmentFormCreated(data) {
//     /*//console.log(data);
//     var x = document.getElementsByClassName("dx-texteditor-input");
//     var para = document.createElement("p");
//     var node = document.createTextNode("This is new.");
//     para.appendChild(node);
//     //console.log(x);
//     x[0].appendChild(para);*/
//       var form=data.form
//         form.option("items", [{
//             label: {
//                 text: "Director"
//             },
//             name: "director",
//             editorType: "dxTextBox",
//         }, {
//             dataField: "startDate",
//             editorType: "dxDateBox"
//         }, {
//             name: "endDate",
//             dataField: "endDate",
//             editorType: "dxDateBox"
//         }, {
//             dataField: "price",
//             editorType: "dxRadioGroup"
//         }]);//*/
//     }
// }
// export class Appointment {
//     text: string;
//     startDate: Date;
//     endDate: Date;
//     disabled?: boolean;
// //    allDay?: boolean;
// }
// let appointments: Appointment[] = [
//     {
//         text: "Website Re-Design Plan",
//         startDate: new Date(2017, 4, 22, 9, 30),
//         endDate: new Date(2017, 4, 22, 11, 30)
//     }, {
//         text: "Book Flights to San Fran for Sales Trip",
//         startDate: new Date(2017, 4, 22, 12, 0),
//         endDate: new Date(2017, 4, 22, 13, 0),
// //        allDay: true
//         disabled:true
//     }, {
//         text: "Install New Router in Dev Room",
//         startDate: new Date(2017, 4, 22, 14, 30),
//         endDate: new Date(2017, 4, 22, 15, 30)
//     }, {
//         text: "Approve Personal Computer Upgrade Plan",
//         startDate: new Date(2017, 4, 23, 10, 0),
//         endDate: new Date(2017, 4, 23, 11, 0)
//     }, {
//         text: "Final Budget Review",
//         startDate: new Date(2017, 4, 23, 12, 0),
//         endDate: new Date(2017, 4, 23, 13, 35)
//     }, {
//         text: "New Brochures",
//         startDate: new Date(2017, 4, 23, 14, 30),
//         endDate: new Date(2017, 4, 23, 15, 45)
//     }, {
//         text: "Install New Database",
//         startDate: new Date(2017, 4, 24, 9, 45),
//         endDate: new Date(2017, 4, 24, 11, 15)
//     }, {
//         text: "Approve New Online Marketing Strategy",
//         startDate: new Date(2017, 4, 24, 12, 0),
//         endDate: new Date(2017, 4, 24, 14, 0)
//     }, {
//         text: "Upgrade Personal Computers",
//         startDate: new Date(2017, 4, 24, 15, 15),
//         endDate: new Date(2017, 4, 24, 16, 30)
//     }, {
//         text: "Customer Workshop",
//         startDate: new Date(2017, 4, 25, 11, 0),
//         endDate: new Date(2017, 4, 25, 12, 0),
// //        allDay: true
//     }, {
//         text: "Prepare 2015 Marketing Plan",
//         startDate: new Date(2017, 4, 25, 11, 0),
//         endDate: new Date(2017, 4, 25, 13, 30)
//     }, {
//         text: "Brochure Design Review",
//         startDate: new Date(2017, 4, 25, 14, 0),
//         endDate: new Date(2017, 4, 25, 15, 30)
//     }, {
//         text: "Create Icons for Website",
//         startDate: new Date(2017, 4, 26, 10, 0),
//         endDate: new Date(2017, 4, 26, 11, 30)
//     }, {
//         text: "Upgrade Server Hardware",
//         startDate: new Date(2017, 4, 26, 14, 30),
//         endDate: new Date(2017, 4, 26, 16, 0)
//     }, {
//         text: "Submit New Website Design",
//         startDate: new Date(2017, 4, 26, 16, 30),
//         endDate: new Date(2017, 4, 26, 18, 0)
//     }, {
//         text: "Launch New Website",
//         startDate: new Date(2017, 4, 26, 12, 20),
//         endDate: new Date(2017, 4, 26, 14, 0)
//     }
// ];
//[{
//     label: {
//         text: "Movie"
//     },
//     editorType: "dxSelectBox",
//     dataField: "movieId",
//     editorOptions: {
//         items: that.moviesData,
//         displayExpr: "text",
//         valueExpr: "id",
//         onValueChanged: function(args) {
//             movieInfo = that.getMovieById(args.value);
//             form.getEditor("director")
//                 .option("value", movieInfo.director);
//             form.getEditor("endDate")
//                 .option("value", new Date (startDate.getTime() + 60 * 1000 * movieInfo.duration));
//         }.bind(this)
//     }
// }, {
//     label: {
//         text: "Director"
//     },
//     name: "director",
//     editorType: "dxTextBox",
//     editorOptions: {
//         value: movieInfo.director,
//         readOnly: true
//     }
// }, {
//     dataField: "startDate",
//     editorType: "dxDateBox",
//     editorOptions: {
//         type: "datetime",
//         onValueChanged: function(args) {
//             startDate = args.value;
//             form.getEditor("endDate")
//                 .option("value", new Date (startDate.getTime() + 60 * 1000 * movieInfo.duration));
//         }
//     }
// }, {
//     name: "endDate",
//     dataField: "endDate",
//     editorType: "dxDateBox",
//     editorOptions: {
//         type: "datetime",
//         readOnly: true
//     }
// }, {
//     dataField: "price",
//     editorType: "dxRadioGroup",
//     editorOptions: {
//         dataSource: [5, 10, 15, 20],
//         itemTemplate: function(itemData) {
//             return "$" + itemData;
//         }
//     }
// }
// var para = document.createElement("p");
// var node = document.createTextNode("This is new.");
// para.appendChild(node);
// //console.log(x);
// x[0].appendChild(para);
/*
    var x = document.getElementsByClassName("dx-box-flex dx-widget dx-visibility-change-handler dx-collection dx-box");
var z = document.getElementsByClassName("dx-item dx-box-item");
//console.log(z)
// var str = '<div class="col-sm-12">'+
//             '<p class="col-sm-12" style="background-color:blue;
//             ">Some more <span>text stupid</span> here</p>'+
//             '<p class="col-sm-12">Some more <span>text stupid</span> here</p>'+
//             '</div>';
//x[0].insertAdjacentHTML( 'beforeend', str );
var y = document.getElementById("myForm");
x[0].appendChild(y);
//*/ 
