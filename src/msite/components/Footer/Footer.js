import React from 'react';
import './Footer.scss';

function Footer() {
    const handleNavigation = (path) => {
        window.location.href = path;
    };

    const handleSocialMediaClick = (url) => {
        window.open(url, '_blank');
    };

    return (
        <div className="footer">
            <div className="social-media-icons">
                <div className="social-icon" onClick={() => handleSocialMediaClick('https://twitter.com')}>
                    <img src={"https://ik.imagekit.io/d6em7wa1j/open-fashion/Twitter.svg?updatedAt=1754481006431"} alt="Twitter" />
                </div>
                <div className="social-icon" onClick={() => handleSocialMediaClick('https://instagram.com')}>
                    <img src={"https://ik.imagekit.io/d6em7wa1j/open-fashion/Instagram.svg?updatedAt=1754481006300"} alt="Instagram" />
                </div>
                <div className="social-icon" onClick={() => handleSocialMediaClick('https://youtube.com')}>
                    <img src={"https://ik.imagekit.io/d6em7wa1j/open-fashion/YouTube.svg?updatedAt=1754481006498"} alt="YouTube" />
                </div>
            </div>
            
             <div className="decorated-title">
                <span className="diamond"></span>
            </div>

            <div className="footer-contact-info">
                <div className="contact-item">
                    <a href="mailto:support@openui.design" className="contact-link">support@openui.design</a>
                </div>
                <div className="contact-item">
                    <a href="tel:+60825876" className="contact-link">+60 825 876</a>
                </div>
                <div className="contact-item">
                    <span className="contact-hours">08:00 - 22:00 - Everyday</span>
                </div>
            </div>

            <div className="decorated-title">
                <span className="diamond"></span>
            </div>

            <div className="footer-links">
                <div onClick={() => handleNavigation('/about')} className="footer-link">About</div>
                <div onClick={() => handleNavigation('/blog')} className="footer-link">Blog</div>
                <div onClick={() => handleNavigation('/contact')} className="footer-link">Contact</div>
            </div>
            <div className="footer-copyright">
                <p>Copyright© OpenUI All Rights Reserved.</p>
            </div>
        </div>
    );
}

export default Footer;
