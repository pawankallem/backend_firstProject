function navbar(){
    return `    <div class="devmain">
    <div class="devbox1">
        <div id="devlogo">
            <img src="https://www.paiinternational.in/static/assets/pai/images/logo.png">
        </div>
        <div id="devcartno"><img src="https://www.paiinternational.in/static/assets/pai/images/cart-icon.png"
                alt=""></div>
        <div id="devlocation"><img src="https://www.paiinternational.in/static/assets/pai/images/location.png"
                alt="">Location</div>

        <div id="devsearch">
            <div id="devsearchflex">
                <input id="devinput" type="text" placeholder="Enter Name of Product Or Brands and More">

            </div>
        </div>


        <div id="devlogin"><a href="../html/login.html" id="devbtn"></a></div>
        <div id="devcart"><img src="https://www.paiinternational.in/static/assets/pai/images/cart-icon.png" alt="">
        </div>

    </div>
    <hr>

    <nav>

        <input type="checkbox" id="click">
        <label for="click" class="menu-btn">
            <i class="fas fa-bars"></i>
        </label>
        <ul>
            <li>


            </li>
            <div class="dropdown">
                <button class="dropbtn">
                    <a > <img  id="devassesories" 
                            src="https://www.paiinternational.in/static/assets/pai/images/cate-icon.png" alt="">
                        Select Catogery</a>
                </button>
                <div class="dropdown-content">
                    <a href="">Furniture</a>
                    <a  href="" >Mobile and Tablet</a>
                    <a href="">Home Appliance</a>
                    <a href="">Kichen Appliances</a>
                    <a href="">Laptop & IT</a>
                    <a href="">Fashion</a>
                    <a href="">Personal Care</a>
                    <a href="">Home Entertainment</a>


                </div>
            </div>
            <li> <a href="#"> <img src="../res/gift (6).png" alt=""> Gift Cards</a> </li>
            <li> <a href="#"> <img src="https://www.paiinternational.in/static/assets/pai/images/luckydraw.png"
                        alt=""> Draw Results</a> </li>
            <li> <a href="#"> <img src="../res/deals (1).png" alt=""> Deals Zone</a> </li>
            <li> <a href="../html/map.html"><img src="../res/store-locator (1).png" alt=""> store-locator</a> </li>
            <li> <a href="../html/services.html"><img src="../res/services (1).png" alt=""> Services</a> </li>
            <li id="devappdownload"> <a href="#"><img src="../res/app-icon (1).png" alt=""> Download App</a> </li>
        </ul>
    </nav>
</div>
<div class="content">
</div>`
}

module.exports={navbar}