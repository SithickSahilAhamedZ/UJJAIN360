import React, { useState } from 'react';
import Card from '../components/Card';
import { TRANSPORT_OPTIONS, STAY_OPTIONS } from '../constants';
import { Bus, BedDouble, Calendar, Star, CheckCircle, X, Wifi, Zap, Building, Wallet, GlassWater } from 'lucide-react';
import { useI18n } from '../i18n';

type BookingTab = 'Transport' | 'Stay';
type TransportOption = typeof TRANSPORT_OPTIONS[0];
type StayOption = typeof STAY_OPTIONS[0];

interface BookingPageProps {
  initialTab?: BookingTab;
}

const Checkbox: React.FC<{ label: string; checked: boolean; onChange: (checked: boolean) => void; }> = ({ label, checked, onChange }) => (
    <label className="flex items-center space-x-2 cursor-pointer text-sm">
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500 focus:ring-offset-0" />
        <span className="text-gray-700 dark:text-gray-300">{label}</span>
    </label>
);

const BookingPage: React.FC<BookingPageProps> = ({ initialTab }) => {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<BookingTab>(initialTab || 'Stay');
  const [selectedTransportTime, setSelectedTransportTime] = useState<string>('06:00');
  const [selectedItem, setSelectedItem] = useState<TransportOption | StayOption | null>(null);
  const [bookingStep, setBookingStep] = useState<'selection' | 'confirmation' | 'success'>('selection');

  // Filter states
  const [transportFilters, setTransportFilters] = useState({ ac: true, nonAc: false, sleeper: true, wifi: false, charging: true, waterBottle: false, price: 500 });
  const [stayFilters, setStayFilters] = useState({ hotel: true, dormitory: false, price: 5000, rating: 'any', amenities: { wifi: false, roomService: false, templeView: false } });

  const handleBookNowClick = (item: TransportOption | StayOption) => {
    setSelectedItem(item);
    setBookingStep('confirmation');
  };

  const handleConfirmBooking = () => {
    setBookingStep('success');
  };

  const handleCloseModal = () => {
    setBookingStep('selection');
    setSelectedItem(null);
  };

  const isTransportOption = (item: any): item is TransportOption => 'departure' in item;

  const BookingModal = () => {
    if (bookingStep === 'selection' || !selectedItem) return null;

    const renderConfirmation = () => (
      <>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">{t('confirmBooking')}</h2>
          <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-800 dark:hover:text-white"><X size={24}/></button>
        </div>
        <div className="space-y-3">
          <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-40 object-cover rounded-lg" />
          <h3 className="font-bold text-lg text-gray-800 dark:text-white">{selectedItem.name}</h3>
          {isTransportOption(selectedItem) ? (
            <div className="text-sm text-gray-600 dark:text-gray-300">
              <p><strong>{t('date')}</strong> 08-09-2025</p>
              <p><strong>{t('time')}</strong> {selectedTransportTime}</p>
              <p><strong>{t('fromTo')}</strong> {selectedItem.from}</p>
            </div>
          ) : (
            <div className="text-sm text-gray-600 dark:text-gray-300">
                <p><strong>{t('checkIn')}:</strong> 08-09-2025</p>
                <p><strong>{t('checkOut')}:</strong> 09-09-2025</p>
                <p><strong>{t('location')}</strong> {selectedItem.location}</p>
            </div>
          )}
          <div className="text-right font-bold text-xl text-gray-800 dark:text-white">
            {t('total')}: ₹{selectedItem.price}
          </div>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button onClick={handleCloseModal} className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200 font-semibold hover:bg-gray-300 dark:hover:bg-gray-500">{t('cancel')}</button>
          <button onClick={handleConfirmBooking} className="px-4 py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600">{t('confirmAndPay')}</button>
        </div>
      </>
    );

    const renderSuccess = () => (
       <div className="text-center p-4">
            <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t('bookingConfirmed')}</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{t('bookingSuccessMessage', { itemName: selectedItem.name })}</p>
            <button onClick={handleCloseModal} className="mt-6 w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600">{t('done')}</button>
        </div>
    );

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
        <Card className="w-full max-w-md">
          {bookingStep === 'confirmation' && renderConfirmation()}
          {bookingStep === 'success' && renderSuccess()}
        </Card>
      </div>
    );
  }

  const renderTransportOptions = () => (
    <div className="space-y-4">
      <Card className="!p-3 flex flex-wrap gap-2 justify-between items-center">
         <div>
            <p className="font-bold text-gray-800 dark:text-white">{t('vehiclesAvailable')}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t('optionsFound', { count: TRANSPORT_OPTIONS.length })}</p>
        </div>
        <div className="flex items-center space-x-2">
            <label htmlFor="sort-transport" className="text-sm font-semibold text-gray-600 dark:text-gray-400">{t('sortBy')}</label>
            <select id="sort-transport" className="p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm">
                <option>{t('rating')}</option>
                <option>{t('priceLowHigh')}</option>
                <option>{t('priceHighLow')}</option>
            </select>
        </div>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TRANSPORT_OPTIONS.map((item, index) => (
          <Card key={index} className="!p-0 overflow-hidden flex flex-col">
            <img src={item.image} alt={item.name} className="w-full h-32 object-cover" />
            <div className="p-3 flex flex-col flex-grow">
              <h3 className="font-bold text-lg text-gray-800 dark:text-white">{item.name}</h3>
              <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                <span>{item.from}</span>
                <span className="flex items-center text-green-600"><Star size={14} className="fill-current text-yellow-400 mr-1"/>{item.rating}</span>
              </div>
              <div className="flex justify-between items-center my-2 text-sm font-bold">
                <span className="text-gray-800 dark:text-gray-200">{item.departure}</span>
                <span className="text-gray-400 text-xs">{item.time}</span>
                <span className="text-gray-800 dark:text-gray-200">{item.arrival}</span>
              </div>
              <div className="flex space-x-2 text-xs text-gray-500 dark:text-gray-400 my-3">
                {item.features.slice(0, 3).map(f => <span key={f} className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{f}</span>)}
              </div>
              <div className="flex justify-between items-center mt-auto pt-2">
                <p className="font-bold text-xl text-gray-800 dark:text-white">₹{item.price}<span className="text-sm font-normal text-gray-500 dark:text-gray-400">{t('perPerson')}</span></p>
                <button onClick={() => handleBookNowClick(item)} className="bg-blue-500 text-white px-5 py-2 rounded-lg font-semibold text-sm hover:bg-blue-600">{t('bookNow')}</button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderStayOptions = () => (
    <div className="space-y-4">
      <Card className="!p-3 flex flex-wrap gap-2 justify-between items-center">
        <div>
            <p className="font-bold text-gray-800 dark:text-white">{t('accommodationAvailable')}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t('optionsFound', { count: STAY_OPTIONS.length })}</p>
        </div>
        <div className="flex items-center space-x-2">
            <label htmlFor="sort-stay" className="text-sm font-semibold text-gray-600 dark:text-gray-400">{t('sortBy')}</label>
            <select id="sort-stay" className="p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm">
                <option>{t('rating')}</option>
                <option>{t('priceLowHigh')}</option>
                <option>{t('priceHighLow')}</option>
            </select>
        </div>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {STAY_OPTIONS.map((item, index) => (
          <Card key={index} className="!p-0 overflow-hidden flex flex-col">
            <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="font-bold text-lg text-gray-800 dark:text-white">{item.name}</h3>
              <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                <span>{item.location}</span>
                <span className="flex items-center text-green-600"><Star size={14} className="fill-current text-yellow-400 mr-1"/>{item.rating}</span>
                <span>({item.reviews} reviews)</span>
              </div>
              <div className="flex justify-between items-center my-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
                <span>{t('checkIn')}: {item.checkIn}</span>
                <span>{t('checkOut')}: {item.checkOut}</span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-green-700 my-3">
                {item.features.map(f => <span key={f} className="bg-green-100 dark:bg-green-900/50 px-2 py-1 rounded">{f}</span>)}
              </div>
              <div className="flex items-center justify-between mt-auto pt-2">
                <p className="font-bold text-xl text-gray-800 dark:text-white">₹{item.price}<span className="text-sm font-normal text-gray-500 dark:text-gray-400">{t('perNight')}</span></p>
                <button onClick={() => handleBookNowClick(item)} className="bg-green-500 text-white px-5 py-2 rounded-lg font-semibold text-sm hover:bg-green-600">{t('bookNow')}</button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderFilters = () => (
    <Card className="flex flex-col flex-grow">
      <div>
        <h3 className="font-bold text-gray-800 dark:text-white mb-4">{t('filters')}</h3>
        <div className="space-y-6">
          {activeTab === 'Transport' ? (
              <>
                  <div>
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">{t('departureDateTime')}</p>
                      <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="font-bold text-gray-800 dark:text-white">08-09-2025</p>
                          <Calendar className="text-gray-400"/>
                      </div>
                  </div>
                  <div>
                      <label className="font-semibold text-sm text-gray-600 dark:text-gray-400">{t('busType')}</label>
                      <div className="mt-2 space-y-2">
                          <Checkbox label={t('ac')} checked={transportFilters.ac} onChange={(c) => setTransportFilters(f => ({...f, ac: c}))} />
                          <Checkbox label={t('nonAc')} checked={transportFilters.nonAc} onChange={(c) => setTransportFilters(f => ({...f, nonAc: c}))} />
                          <Checkbox label={t('sleeper')} checked={transportFilters.sleeper} onChange={(c) => setTransportFilters(f => ({...f, sleeper: c}))} />
                      </div>
                  </div>
                  <div>
                      <label className="font-semibold text-sm text-gray-600 dark:text-gray-400">{t('amenities')}</label>
                      <div className="mt-2 space-y-2">
                          <Checkbox label={t('wifi')} checked={transportFilters.wifi} onChange={(c) => setTransportFilters(f => ({...f, wifi: c}))} />
                          <Checkbox label={t('chargingPort')} checked={transportFilters.charging} onChange={(c) => setTransportFilters(f => ({...f, charging: c}))} />
                          <Checkbox label={t('waterBottle')} checked={transportFilters.waterBottle} onChange={(c) => setTransportFilters(f => ({...f, waterBottle: c}))} />
                      </div>
                  </div>
                  <div>
                      <label htmlFor="price-range-transport" className="font-semibold text-sm text-gray-600 dark:text-gray-400">{t('priceRange')}</label>
                      <input id="price-range-transport" type="range" min="100" max="500" value={transportFilters.price} onChange={(e) => setTransportFilters(f => ({...f, price: +e.target.value}))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600 mt-2 accent-orange-500"/>
                      <div className="flex justify-between text-xs font-medium text-gray-500 dark:text-gray-400">
                          <span>₹100</span>
                          <span>₹{transportFilters.price}</span>
                      </div>
                  </div>
              </>
          ) : (
              <>
                  <div className="grid grid-cols-2 gap-3">
                      <div>
                          <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">{t('checkIn')}</p>
                          <p className="font-bold text-gray-800 dark:text-white p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">08-09-2025</p>
                      </div>
                      <div>
                          <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">{t('checkOut')}</p>
                          <p className="font-bold text-gray-800 dark:text-white p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">09-09-2025</p>
                      </div>
                  </div>
                  <div>
                      <label className="font-semibold text-sm text-gray-600 dark:text-gray-400">{t('propertyType')}</label>
                      <div className="mt-2 space-y-2">
                          <Checkbox label={t('hotel')} checked={stayFilters.hotel} onChange={(c) => setStayFilters(f => ({...f, hotel: c}))} />
                          <Checkbox label={t('dormitory')} checked={stayFilters.dormitory} onChange={(c) => setStayFilters(f => ({...f, dormitory: c}))} />
                      </div>
                  </div>
                   <div>
                      <label htmlFor="price-range" className="font-semibold text-sm text-gray-600 dark:text-gray-400">{t('priceRange')}</label>
                      <input id="price-range" type="range" min="250" max="5000" value={stayFilters.price} onChange={(e) => setStayFilters(f => ({...f, price: +e.target.value}))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600 mt-2 accent-orange-500"/>
                      <div className="flex justify-between text-xs font-medium text-gray-500 dark:text-gray-400">
                          <span>₹250</span>
                          <span>₹{stayFilters.price}</span>
                      </div>
                  </div>
                  <div>
                      <label className="font-semibold text-sm text-gray-600 dark:text-gray-400">{t('guestRating')}</label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {['any', '4.5', '4.0'].map(rating => (
                           <button key={rating} onClick={() => setStayFilters(f => ({...f, rating}))} className={`p-2 rounded-lg text-xs font-semibold ${stayFilters.rating === rating ? 'bg-orange-500 text-white' : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300'}`}>
                                {t(rating === 'any' ? 'any' : (rating === '4.5' ? 'excellent4_5' : 'veryGood4'))}
                            </button>
                        ))}
                      </div>
                  </div>
                  <div>
                      <label className="font-semibold text-sm text-gray-600 dark:text-gray-400">{t('amenities')}</label>
                      <div className="mt-2 space-y-2">
                           <Checkbox label={t('wifi')} checked={stayFilters.amenities.wifi} onChange={(c) => setStayFilters(f => ({...f, amenities: {...f.amenities, wifi: c}}))} />
                           <Checkbox label={t('roomService')} checked={stayFilters.amenities.roomService} onChange={(c) => setStayFilters(f => ({...f, amenities: {...f.amenities, roomService: c}}))} />
                           <Checkbox label={t('templeView')} checked={stayFilters.amenities.templeView} onChange={(c) => setStayFilters(f => ({...f, amenities: {...f.amenities, templeView: c}}))} />
                      </div>
                  </div>
              </>
          )}
        </div>
      </div>
      <div className="mt-auto pt-6">
        <button className="w-full py-3 bg-orange-500 text-white font-bold rounded-lg shadow hover:bg-orange-600 transition-colors">{t('applyFilters')}</button>
      </div>
    </Card>
  );


  return (
    <>
      <BookingModal />
      <div>
        <div className="flex items-center space-x-3 mb-6">
          <Calendar size={32} className="text-orange-500" />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{t('bookingCentre')}</h1>
        </div>
        
        <div className="lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:gap-6 space-y-6 lg:space-y-0">
          <div className="lg:col-span-1 space-y-4 lg:flex lg:flex-col lg:space-y-0 lg:gap-6">
            <div className="flex border-2 border-white dark:border-gray-700 rounded-lg p-1 bg-white/50 dark:bg-gray-700/50">
              <button
                onClick={() => setActiveTab('Transport')}
                className={`w-1/2 py-3 rounded-md font-semibold flex items-center justify-center space-x-2 transition-all ${activeTab === 'Transport' ? 'bg-blue-500 text-white shadow' : 'text-gray-600 dark:text-gray-300'}`}
              >
                <Bus/>
                <span>{t('transport')}</span>
              </button>
              <button
                onClick={() => setActiveTab('Stay')}
                className={`w-1/2 py-3 rounded-md font-semibold flex items-center justify-center space-x-2 transition-all ${activeTab === 'Stay' ? 'bg-green-500 text-white shadow' : 'text-gray-600 dark:text-gray-300'}`}
              >
                <BedDouble/>
                <span>{t('stay')}</span>
              </button>
            </div>
            {renderFilters()}
          </div>
          
          <div className="lg:col-span-2 xl:col-span-3">
            {activeTab === 'Transport' ? renderTransportOptions() : renderStayOptions()}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingPage;