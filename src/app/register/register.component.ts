import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModule } from '@angular/core';
import * as $ from 'jquery';
//import { ModalModule } from 'ngx-bootstrap/modal';
import { Customers } from "../Customers"
import { GetDataService } from '../get-data.service'

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    customerDetails: Customers = new Customers;
    customer: Customers = new Customers;
    CustomersList: Customers[] = [];
    valid: any;
    model: Customers = new Customers();
    loginstatus: string;
    show: boolean;
    signup: boolean;
    signupButton: boolean;
    registerButton: boolean;
    custdetails: object;
    registrant: any;
    regcomp: boolean;
    compregistered: any;
    backform:boolean;
    @ViewChild('f') form: any;
    @ViewChild('c') formcomp: any;
    constructor(private getdata: GetDataService) { }
    register(): any {
        if (this.form.valid) {
            let register = this.getdata.register(this.customerDetails)
            register.subscribe(res => {
                this.registrant = res.json()
                if (this.registrant.customer === "customer can register") {
                    //this.custdetails = this.form.value
                    this.regcomp = true;
                    this.show = false;
                    this.backform=true;
                }
                console.log(this.registrant.customer)
            })
            
            console.log(this.customerDetails)
                
            


            
        }
    }
    compregister(): void {
        
        console.log(this.customerDetails)
        this.compregistered = this.getdata.compregistered(this.customerDetails)
        
        this.compregistered.subscribe(res => console.log("success"))
        window.location.replace("/customer") 
    }

    signIn(): void {
        let signin = this.getdata.signin(this.customerDetails)
        if (this.form.valid) {
            signin.subscribe(
                res => {
                    this.valid = res.json();
                    if (this.valid.customer == "has to register") {
                        this.loginstatus = "has to register";
                    }
                    else {
                        this.loginstatus = undefined;
                        window.location.replace("/customer")
                    }
                });
            this.customerDetails = new Customers;
        }
    }
    registerForm() {
        this.show = true
        this.signup = true
        this.registerButton = true;
        this.signupButton = false
    }

    signUpForm() {
        this.show = true
        this.signup = false
        this.registerButton = false;
        this.signupButton = true;
    }
    ngOnInit() {
        $(function () {
            $('.button-checkbox').each(function () {

                // Settings
                var $widget = $(this),
                    $button = $widget.find('button'),
                    $checkbox = $widget.find('input:checkbox'),
                    color = $button.data('color'),
                    settings = {
                        on: {
                            icon: 'glyphicon glyphicon-check'
                        },
                        off: {
                            icon: 'glyphicon glyphicon-unchecked'
                        }
                    };

                // Event Handlers
                $button.on('click', function () {
                    $checkbox.prop('checked', !$checkbox.is(':checked'));
                    $checkbox.triggerHandler('change');
                    updateDisplay();
                });
                $checkbox.on('change', function () {
                    updateDisplay();
                });

                // Actions
                function updateDisplay() {
                    var isChecked = $checkbox.is(':checked');

                    // Set the button's state
                    $button.data('state', (isChecked) ? "on" : "off");

                    // Set the button's icon
                    $button.find('.state-icon')
                        .removeClass()
                        .addClass('state-icon ' + settings[$button.data('state')].icon);

                    // Update the button's color
                    if (isChecked) {
                        $button
                            .removeClass('btn-default')
                            .addClass('btn-' + color + ' active');
                    }
                    else {
                        $button
                            .removeClass('btn-' + color + ' active')
                            .addClass('btn-default');
                    }
                }

                // Initialization
                function init() {

                    updateDisplay();

                    // Inject the icon if applicable
                    if ($button.find('.state-icon').length == 0) {
                        $button.prepend('<i class="state-icon ' + settings[$button.data('state')].icon + '"></i>');
                    }
                }
                init();
            });
        });
    }

}
