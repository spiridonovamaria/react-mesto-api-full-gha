function InfoTooltip({ isOpen, onClose, img, header }) {
    return (
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container_infotooltip">
                <img className='popup__infotooltip-img' src={img} alt={header} />
                <h2 className="popup__infotooltip-header ">{header}</h2>
                <button className="popup__close" type="button" onClick={onClose} />
            </div>
        </div>
    )
}

export default InfoTooltip;