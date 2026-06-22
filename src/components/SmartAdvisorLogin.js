import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import {
    Button,
    Checkbox,
    CircularProgress,
    FormControl,
    InputAdornment,
    OutlinedInput,
    Typography,
    Slider
} from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import { FaUser, FaMobileAlt, FaMapMarkerAlt, FaMoneyBillWave, FaLocationArrow } from "react-icons/fa";
import { getDeviceLocation } from '../utils/location';
import { useForm } from 'react-hook-form';
import ChatWidget from "./ChatWidget";
import { getUsers, registUser } from "../api/users";
import '@fontsource/rubik';
import { useSelector, useDispatch } from "react-redux";
import { addChatMessage } from '../store/chatSlice';
import { useLanguage, formatCurrency } from '../i18n';
import LanguageToggle from './LanguageToggle';

const SmartAdvisorLogin = ({ isOpen }) => {
    const { register, handleSubmit } = useForm();
    const { lang, t } = useLanguage();
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const [startChat, setStartChat] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [statusPernikahan, setStatusPernikahan] = useState('');
    const [budgetMin, setBudgetMin] = useState(500000);
    const [budgetMax, setBudgetMax] = useState(3000000);
    const [lokasi, setLokasi] = useState('');
    const [termCondition, setChecked] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [isSave, setIsSave] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [sessionId, setSessionId] = useState('');
    const [input, setInput] = useState('');
    const [sendTrigger, setSendTrigger] = useState(false);
    const [readOnly, setReadOnly] = useState(false);
    const [subTitle, setSubtitle] = useState(t('app.formTitle'));
    const [isLocating, setIsLocating] = useState(false);
    const [locationError, setLocationError] = useState('');
    const { chatMessage } = useSelector((state) => state.chat);
    const dispatch = useDispatch();

    useEffect(() => {
        getUsers().then(userData => {
            if (userData) {
                setReadOnly(true);
                setSessionId(userData.session || '');
                setName(userData.name || '');
                setPhone(userData.phone || '');
                setStatusPernikahan(userData.status_pernikahan || '');
                setBudgetMin(userData.budget_min || 500000);
                setBudgetMax(userData.budget_max || 3000000);
                setLokasi(userData.lokasi || '');
                setIsRegistered(true);
                setSubtitle(t('app.autoFormTitle'));
            }
        });
    }, [t]);

    useEffect(() => {
        validationForm();
    });

    useEffect(() => {
        setSubtitle(isRegistered ? t('app.autoFormTitle') : t('app.formTitle'));
    }, [lang, isRegistered, t]);

    const validationForm = () => {
        if (name.length > 3 && phone !== "" && statusPernikahan !== "" && lokasi !== "" && termCondition) {
            setStartChat(true);
        } else {
            setStartChat(false);
        }
    };

    const handleChangeNumber = (e) => {
        const numberOnlyRegex = /^[0-9\b]+$/;
        if (e.target.value === '' || numberOnlyRegex.test(e.target.value)) {
            setPhone(e.target.value);
        }
    };

    const handleChangeCheckbox = (e) => {
        setChecked(e.target.checked);
    };

    const handleBudgetChange = (event, newValue) => {
        setBudgetMin(newValue[0]);
        setBudgetMax(newValue[1]);
    };

    const handleDetectLocation = async () => {
        if (readOnly || isLocating) return;
        setIsLocating(true);
        setLocationError('');
        try {
            const { areaName } = await getDeviceLocation();
            if (areaName) {
                setLokasi(areaName);
            } else {
                setLocationError(t('form.locationErrorName'));
            }
        } catch (error) {
            const errorKey = error.code === 'denied' ? 'form.locationErrorDenied' : 'form.locationError';
            setLocationError(t(errorKey));
            console.error('Location detection failed:', error);
        } finally {
            setIsLocating(false);
        }
    };

    const formatRupiah = (value) => formatCurrency(value, lang);

    const onSubmit = () => {
        setIsSave(true);
        if (isRegistered) {
            setIsSuccess(true);
            setIsSave(false);
        } else {
            registUser(name, phone, statusPernikahan, budgetMin, budgetMax, lokasi).then((response) => {
                if (response) {
                    setSessionId(response.session || '');
                    setIsSuccess(true);
                    setIsSave(false);
                }
            });
        }
    };

    const handleQuickSend = (text) => {
        setInput(text);
        dispatch(addChatMessage({
            user: name,
            text: text,
            type: 'text'
        }));
        setSendTrigger(true);
    };

    const getConsultationText = () => t('quickSend.consultation', {
        status: statusPernikahan === 'menikah' ? t('form.married') : t('form.single'),
        budgetMin: formatRupiah(budgetMin),
        budgetMax: formatRupiah(budgetMax),
        location: lokasi || 'Jakarta'
    });

    if (!isOpen) return null;

    return (
        <Box
            className="chat-container-mobile"
            sx={{
                position: { xs: 'fixed', sm: 'fixed' },
                top: { xs: 0, sm: 'auto' },
                left: { xs: 0, sm: 'auto' },
                right: { xs: 'auto', sm: '20px' },
                bottom: { xs: 0, sm: '80px' },
                width: { xs: '100%', sm: '380px' },
                height: { xs: '100vh', sm: '600px' },
                maxWidth: { xs: '100%', sm: '380px' },
                maxHeight: { xs: '100vh', sm: '90vh' },
                backgroundColor: '#f1f1f1',
                borderRadius: { xs: 0, sm: '10px' },
                boxShadow: { xs: 'none', sm: '0 2px 10px rgba(0,0,0,0.2)' },
                zIndex: 999,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1.5, flexShrink: 0 }}>
                <LanguageToggle />
            </Box>
            <Box
                sx={{
                    width: '100%',
                    flex: 1,
                    background: '#EFEFEF',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    fontFamily: 'Rubik, Arial, sans-serif',
                }}
            >
                {isSuccess && chatMessage.length === 0 ? (
                    <Box sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        background: '#f5f5f5',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        fontFamily: 'Rubik, Arial, sans-serif',
                        p: 0,
                        m: 0,
                    }}>
                        <Box sx={{ width: '100%', position: 'relative' }}>
                            <img src="bgDashboard.svg" alt="Dashboard" style={{ width: '100%', borderTopLeftRadius: 8, borderTopRightRadius: 8 }} />
                        </Box>
                        <Box sx={{ px: { xs: 1.5, sm: 2 }, py: 1, width: '100%' }}>
                            <Typography sx={{ fontSize: { xs: 12, sm: 13 }, color: '#4B5563', mb: 0.5, textAlign: 'center' }}>
                                {t('app.tagline')}
                            </Typography>
                            <Typography sx={{ fontWeight: 700, fontSize: { xs: 18, sm: 20 }, color: '#222', mb: 2, textAlign: 'center' }}>
                                {t('app.cta')}
                            </Typography>
                        </Box>
                        <Box sx={{ px: { xs: 1.5, sm: 2 }, width: '100%' }}>
                            <Typography sx={{
                                fontWeight: 700,
                                fontSize: { xs: 14, sm: 15 },
                                mb: 1,
                                fontFamily: 'Rubik, Arial, sans-serif',
                                textAlign: 'left',
                                marginLeft: { xs: 1, sm: 2 }
                            }}>
                                {t('app.greeting')}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 }, margin: { xs: 1, sm: 2 } }}>
                                <Box
                                    sx={{
                                        flex: 1,
                                        background: '#fff',
                                        borderRadius: 3,
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                        p: 0,
                                        minWidth: 0,
                                        position: 'relative',
                                        transition: 'all 0.2s ease',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-end',
                                        height: { xs: 140, sm: 180 },
                                        cursor: 'pointer',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                        },
                                        '&:active': {
                                            transform: 'translateY(0)',
                                        },
                                        WebkitTapHighlightColor: 'transparent',
                                        touchAction: 'manipulation',
                                    }}
                                    onClick={() => handleQuickSend(t('quickSend.recommendation'))}
                                >
                                    <img
                                        src="recom.svg"
                                        alt="Recommendation"
                                        style={{
                                            width: '100%',
                                            maxHeight: '70%',
                                        }}
                                    />
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 1.5, py: 1 }}>
                                        <Typography sx={{
                                            fontWeight: 600,
                                            fontSize: 13,
                                            color: '#222',
                                            fontFamily: 'Rubik, Arial, sans-serif'
                                        }}>
                                            {t('cards.housingRecommendation')}
                                        </Typography>
                                        <button style={{
                                            background: '#16a34a',
                                            border: 'none',
                                            borderRadius: '50%',
                                            width: 28,
                                            height: 28,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#fff',
                                            cursor: 'pointer',
                                            WebkitTapHighlightColor: 'transparent',
                                            touchAction: 'manipulation',
                                            transition: 'all 0.2s ease',
                                        }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleQuickSend(t('quickSend.recommendation'));
                                            }}
                                            onMouseDown={(e) => e.preventDefault()}
                                        >
                                            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                                                <path d="M6 10h8M12 6l4 4-4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        flex: 1,
                                        background: '#fff',
                                        borderRadius: 3,
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                        p: 0,
                                        minWidth: 0,
                                        position: 'relative',
                                        border: '2px solid transparent',
                                        transition: 'all 0.2s ease',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-end',
                                        height: { xs: 140, sm: 180 },
                                        cursor: 'pointer',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                        },
                                        '&:active': {
                                            transform: 'translateY(0)',
                                        },
                                        WebkitTapHighlightColor: 'transparent',
                                        touchAction: 'manipulation',
                                    }}
                                    onClick={() => handleQuickSend(getConsultationText())}
                                >
                                    <img
                                        src="consult.svg"
                                        alt="Consultation"
                                        style={{
                                            width: '100%',
                                            height: '78%',
                                            borderTopLeftRadius: 10,
                                            borderTopRightRadius: 10,
                                        }}
                                    />
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 1.5, py: 1 }}>
                                        <Typography sx={{
                                            fontWeight: 600,
                                            fontSize: 13,
                                            color: '#222',
                                            fontFamily: 'Rubik, Arial, sans-serif'
                                        }}>
                                            {t('cards.housingConsultation')}
                                        </Typography>
                                        <button style={{
                                            background: '#16a34a',
                                            border: 'none',
                                            borderRadius: '50%',
                                            width: 28,
                                            height: 28,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#fff',
                                            cursor: 'pointer',
                                            WebkitTapHighlightColor: 'transparent',
                                            touchAction: 'manipulation',
                                            transition: 'all 0.2s ease',
                                        }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleQuickSend(getConsultationText());
                                            }}
                                            onMouseDown={(e) => e.preventDefault()}
                                        >
                                            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                                                <path d="M6 10h8M12 6l4 4-4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                ) : null}

                {!isSave ? (
                    !isSuccess ? (
                        <Box
                            component="section"
                            sx={{
                                p: { xs: 1.5, sm: 2 },
                                marginTop: { xs: 2, sm: 4 },
                                bgcolor: '#ffffff',
                                fontFamily: 'Rubik, Arial, sans-serif',
                                fontWeight: 500,
                                fontSize: '14px',
                                textAlign: 'center',
                                mx: { xs: 1, sm: 0 },
                                borderRadius: { xs: 2, sm: 0 },
                            }}
                        >
                            <div dangerouslySetInnerHTML={{ __html: subTitle }} />
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <FormControl fullWidth sx={{ marginTop: { xs: 2, sm: 4 } }}>
                                    <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#64748b', mb: 0.5, textAlign: 'left' }}>
                                        {t('form.fullName')}
                                    </Typography>
                                    <OutlinedInput
                                        id="outlined-adornment-name"
                                        value={name}
                                        startAdornment={<InputAdornment position="start"><FaUser style={{ color: '#16a34a' }} /></InputAdornment>}
                                        placeholder={t('form.fullNamePlaceholder')}
                                        size="small"
                                        required
                                        readOnly={readOnly}
                                        onChange={e => setName(e.target.value)}
                                        sx={{
                                            backgroundColor: '#f8fafc',
                                            borderRadius: '12px',
                                            '& fieldset': { borderColor: '#e2e8f0' },
                                            '&:hover fieldset': { borderColor: '#16a34a' },
                                            '&.Mui-focused fieldset': { borderColor: '#16a34a' },
                                        }}
                                    />
                                </FormControl>

                                <FormControl fullWidth sx={{ marginTop: { xs: 2, sm: 3 } }}>
                                    <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#64748b', mb: 0.5, textAlign: 'left' }}>
                                        {t('form.phone')}
                                    </Typography>
                                    <OutlinedInput
                                        id="outlined-adornment-phone"
                                        value={phone}
                                        startAdornment={<InputAdornment position="start"><FaMobileAlt style={{ color: '#16a34a' }} /></InputAdornment>}
                                        placeholder={t('form.phonePlaceholder')}
                                        size="small"
                                        required
                                        readOnly={readOnly}
                                        onChange={handleChangeNumber}
                                        sx={{
                                            backgroundColor: '#f8fafc',
                                            borderRadius: '12px',
                                            '& fieldset': { borderColor: '#e2e8f0' },
                                            '&:hover fieldset': { borderColor: '#16a34a' },
                                            '&.Mui-focused fieldset': { borderColor: '#16a34a' },
                                        }}
                                    />
                                </FormControl>

                                <FormControl fullWidth sx={{ marginTop: { xs: 2, sm: 3 } }}>
                                    <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#64748b', mb: 0.5, textAlign: 'left' }}>
                                        {t('form.maritalStatus')}
                                    </Typography>
                                    <Box sx={{ position: 'relative' }}>
                                        <Box sx={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#16a34a', pointerEvents: 'none' }}>
                                            <FaUser />
                                        </Box>
                                        <select
                                            id="status-pernikahan"
                                            className="flat-select"
                                            value={statusPernikahan}
                                            required
                                            disabled={readOnly}
                                            onChange={e => setStatusPernikahan(e.target.value)}
                                            style={{
                                                width: '100%',
                                                padding: '10.5px 36px 10.5px 40px',
                                                backgroundColor: '#f8fafc',
                                                border: '1px solid #e2e8f0',
                                                borderRadius: '12px',
                                                fontSize: 14,
                                                color: statusPernikahan ? '#222' : '#94a3b8',
                                                appearance: 'none',
                                                WebkitAppearance: 'none',
                                                MozAppearance: 'none',
                                                outline: 'none',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <option value="">{t('form.maritalStatusPlaceholder')}</option>
                                            <option value="lajang">{t('form.single')}</option>
                                            <option value="menikah">{t('form.married')}</option>
                                        </select>
                                        <Box sx={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#64748b', pointerEvents: 'none', fontSize: 12 }}>
                                            ▼
                                        </Box>
                                    </Box>
                                </FormControl>

                                <FormControl fullWidth sx={{ marginTop: { xs: 2, sm: 3 } }}>
                                    <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#64748b', mb: 0.5, textAlign: 'left' }}>
                                        <FaMoneyBillWave style={{ marginRight: 6, verticalAlign: 'middle', color: '#16a34a' }} />
                                        {t('form.budgetRange')}: {formatRupiah(budgetMin)} - {formatRupiah(budgetMax)}
                                    </Typography>
                                    <Slider
                                        value={[budgetMin, budgetMax]}
                                        onChange={handleBudgetChange}
                                        valueLabelDisplay="auto"
                                        valueLabelFormat={formatRupiah}
                                        min={300000}
                                        max={20000000}
                                        step={100000}
                                        disabled={readOnly}
                                        sx={{
                                            color: '#16a34a',
                                            '& .MuiSlider-thumb': {
                                                height: 20,
                                                width: 20,
                                            },
                                        }}
                                    />
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#999' }}>
                                        <span>{formatCurrency(300000, lang)}</span>
                                        <span>{formatCurrency(20000000, lang)}</span>
                                    </Box>
                                </FormControl>

                                <FormControl fullWidth sx={{ marginTop: { xs: 2, sm: 3 } }}>
                                    <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#64748b', mb: 0.5, textAlign: 'left' }}>
                                        {t('form.location')}
                                    </Typography>
                                    <OutlinedInput
                                        id="outlined-adornment-lokasi"
                                        value={lokasi}
                                        startAdornment={<InputAdornment position="start"><FaMapMarkerAlt style={{ color: '#16a34a' }} /></InputAdornment>}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <button
                                                    type="button"
                                                    onClick={handleDetectLocation}
                                                    disabled={readOnly || isLocating}
                                                    title={t('form.detectLocation')}
                                                    style={{
                                                        background: 'transparent',
                                                        border: 'none',
                                                        padding: '4px 8px',
                                                        cursor: readOnly || isLocating ? 'not-allowed' : 'pointer',
                                                        color: isLocating ? '#94a3b8' : '#16a34a',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    {isLocating ? <CircularProgress size={14} color="inherit" /> : <FaLocationArrow size={14} />}
                                                </button>
                                            </InputAdornment>
                                        }
                                        placeholder={t('form.locationPlaceholder')}
                                        size="small"
                                        required
                                        readOnly={readOnly}
                                        onChange={e => setLokasi(e.target.value)}
                                        sx={{
                                            backgroundColor: '#f8fafc',
                                            borderRadius: '12px',
                                            '& fieldset': { borderColor: '#e2e8f0' },
                                            '&:hover fieldset': { borderColor: '#16a34a' },
                                            '&.Mui-focused fieldset': { borderColor: '#16a34a' },
                                        }}
                                    />
                                    {locationError && (
                                        <Typography sx={{ fontSize: 11, color: '#ef4444', mt: 0.5, textAlign: 'left' }}>
                                            {locationError}
                                        </Typography>
                                    )}
                                </FormControl>

                                <Grid2 container spacing={2} sx={{ marginTop: 1 }}>
                                    <Grid2 size={2}>
                                        <Checkbox {...register("termscondition")} {...label} sx={{ paddingX: 0, paddingY: 2 }} onChange={handleChangeCheckbox} />
                                    </Grid2>
                                    <Grid2 size={10}>
                                        <p style={{ fontWeight: 'normal', textAlign: 'justify', fontSize: '15px' }}>
                                            {t('form.terms')}
                                        </p>
                                    </Grid2>
                                </Grid2>

                                <Button
                                    fullWidth
                                    variant="contained"
                                    size="small"
                                    sx={{
                                        marginTop: 1,
                                        backgroundColor: startChat ? '#00880D' : undefined,
                                        fontFamily: 'Rubik, Arial, sans-serif'
                                    }}
                                    type="submit"
                                    disabled={!startChat}
                                >
                                    {t('form.startChat')}
                                </Button>
                            </form>
                        </Box>
                    ) : chatMessage.length > 0 ? (
                        <ChatWidget
                            isOpen={isOpen}
                            name={name}
                            phone={phone}
                            inputFrom={input}
                            sessionId={sessionId}
                            sendTrigger={sendTrigger}
                            setSendTrigger={setSendTrigger}
                        />
                    ) : null
                ) : (
                    <div style={widgetStyles.containerLoading}>
                        <Box textAlign="center">
                            <CircularProgress size={40} style={widgetStyles.childLoading} /><br /><br />
                            <label>{t('form.loading')}</label>
                        </Box>
                    </div>
                )}
            </Box>
        </Box>
    );
};

const widgetStyles = {
    containerLoading: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px',
    },
    childLoading: {
        color: '#00880D',
    },
};

export default SmartAdvisorLogin;
