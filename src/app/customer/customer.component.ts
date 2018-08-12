import { Component,ElementRef, OnInit } from '@angular/core';

import * as $ from 'jquery';
import { resizable } from 'jquery-ui-dist/jquery-ui'
import 'jquery-ui-dist/jquery-ui';
import {QuantityComponent} from '../quantity/quantity.component'
import { GetDataService } from '../get-data.service'
import { MatDialogConfig} from "@angular/material";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
    categories: any;
    selectedcategory: any
    productsInCategory: any
    startedcart: boolean=true;
    cartopen: any;
    continuedcart: boolean=true;
    product: any
    cart:any;
    cartproducts:any
    first:boolean;
    subtotal:number;
    total:number;
    allowshopping:boolean=false;
    constructor(private getdata: GetDataService,public dialog: MatDialog,private _elementRef : ElementRef) { }

    ngOnInit() {
        this.resize();
        this.getCategories()
        this.checkforopencart()
        
    }
    openDialog(product) {
        if(this.allowshopping){
        const dialogConfig = new MatDialogConfig();
    
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        
        // dialogConfig.data = {
        //     id: 1,
        //     title: 'Angular For Beginners'
        // };
    
        
        
        const dialogRef = this.dialog.open(QuantityComponent,{
            height: '200px',
            width: '200px',
            data: {
                measure: product.measure
              }
            
          });
        
        
        dialogRef.afterClosed().subscribe(
            data => {if(data){
                    product.quantity=data;
                    
                    
                    this.addToCart(product);
                }}
        );    
    }
}
    

    
    
    getCategories() {
        this.getdata.getCategories().subscribe(
            res => this.categories = res.json()
        )
    }
    onSelect(category: any): void {
        this.selectedcategory = category;
        this.getdata.getProductsInCategory(this.selectedcategory.id).subscribe(
            res => {
            this.productsInCategory = res.json()
                console.log(this.productsInCategory)
            }
        )

    }
    startcart() {
        
        this.getdata.startShopping().subscribe(res => {

            this.startedcart = false;
            this.allowshopping=true;
        }
        )
    }
    continuecart() {
        this.allowshopping=true;
        this.continuedcart = false;
        this.getCart();

    }
    checkforopencart() {

        this.getdata.checkforopencart().subscribe(res => {
            this.cartopen = res.json()
            if (this.cartopen.cartopen == true) {
                console.log("startedcart")
                this.startedcart = false;
                this.continuedcart = true;
                // this.getCart();

            } else if (this.cartopen.cartopen == false) {
                this.startedcart = true;
                this.continuedcart = false
                console.log("no startedcart")
            } else {

                this.startedcart = false;
                this.continuedcart = false
                console.log("else")
            }
        })

    }
    addToCart(product: any) {
        this.product = product;
        let newproduct = this.getdata.addToCart(this.product)
        newproduct.subscribe(res => {
            console.log("success")
            this.getCart();
        },
            e => console.log(e))
    }
    getCart(){
        let cart = this.getdata.getCart()
        cart.subscribe(res => {
            this.cartproducts=res.json()
            console.log(this.cartproducts)
            this.totaleprice(this.cartproducts)
        },
            e => console.log(e))
    }
    totaleprice(cartproducts){
        this.total=0;
        for (let price of cartproducts) {
            console.log(price.quantity)
        this.subtotal=price.price*price.quantity;
        this.total=this.total+this.subtotal;
    }
}
deleteProduct(product){
    console.log(product.productId)
    this.getdata.deleteProduct(product).subscribe(
        res=>this.getCart()
    )
}





resize(){
    $(document).ready(() => {

        $('#cart').resizable({
            handles: 'e',
            alsoResizeReverse: '#products'
        });

        $('#products').resizable({
            handles: 'e',
            alsoResizeReverse: '#map'
        });

        $('#map').resizable({
            handles: 'e',
            alsoResizeReverse: '#utils'
        });

        var showTab = function (tab) {
            $('.tab').each(function () {
                if ($(this).attr('id') === tab) {
                    if ($(this).is(':visible')) {
                        // navbar: Menu deaktivieren
                        // keine Ahnung, wieso das Bootstrap nicht selber macht
                        $('#' + tab + 'Menu').removeClass('active');
                        // Seite ausblenden
                        $(this).hide();
                    } else {
                        $('#' + tab + 'Menu').addClass('active');
                        // Seite ausblenden
                        $(this).show();
                    }
                }
            });
        };

        $('.nav').on('click', 'li', function () {
            var id = $(this).attr('id'),
                tab = id.substring(0, id.length - 4);
            showTab(tab);
        });

        $.ui.plugin.add("resizable", "alsoResizeReverse", {

            start: function (event, ui) {

                var self = $(this).data("ui-resizable"), o = self.options,

                    _store = function (exp) {
                        $(exp).each(function () {
                            $(this).data("ui-resizable-alsoresize-reverse", {
                                width: parseInt($(this).width(), 10),
                                height: parseInt($(this).height(), 10),
                                left: parseInt($(this).css('left'), 10),
                                top: parseInt($(this).css('top'), 10)
                            });
                        });
                    };

                if (typeof (o.alsoResizeReverse) == 'object' && !o.alsoResizeReverse.parentNode) {
                    if (o.alsoResizeReverse.length) {
                        o.alsoResize = o.alsoResizeReverse[0];
                        _store(o.alsoResizeReverse);
                    } else {
                        $.each(o.alsoResizeReverse, function (exp, c) {
                            _store(exp);
                        });
                    }
                } else {
                    _store(o.alsoResizeReverse);
                }
            },

            resize: function (event, ui) {
                var self = $(this).data("ui-resizable"), o = self.options, os = self.originalSize, op = self.originalPosition,
                    delta = {
                        height: (self.size.height - os.height) || 0,
                        width: (self.size.width - os.width) || 0,
                        top: (self.position.top - op.top) || 0,
                        left: (self.position.left - op.left) || 0
                    },

                    _alsoResizeReverse = function (exp, c) {
                        $(exp).each(function () {
                            var el = $(this),
                                start = $(this).data("ui-resizable-alsoresize-reverse"),
                                style = {},
                                css = c && c.length ? c : ['width', 'height', 'top', 'left'];

                            $.each(css || ['width', 'height', 'top', 'left'], function (i, prop) {
                                var sum = (start[prop] || 0) - (delta[prop] || 0), // subtracting instead of adding
                                    corr = 0;

                                if (prop === 'width') {
                                    // correct for some divs having broad right border
                                    console.log(self.element.context)
                                    if (self.element.id === 'map') {
                                        corr = 5;
                                    } else {
                                        corr = 10;
                                    }
                                }

                                if (sum && sum >= 0) {
                                    style[prop] = sum + corr || null;
                                }
                            });

                            el.css(style);
                        });
                    };

                if (typeof (o.alsoResizeReverse) == 'object' && !o.alsoResizeReverse.nodeType) {
                    $.each(o.alsoResizeReverse, function (exp, c) {
                        _alsoResizeReverse(exp, c);
                    });
                } else {
                    _alsoResizeReverse(o.alsoResizeReverse, 1);
                }
            },

            stop: function (event, ui) {
                var self = $(this).data("ui-resizable");

                $(this).removeData("ui-resizable-alsoresize-reverse");
            }
        });


    }

    );
}
  
  
}