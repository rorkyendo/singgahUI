import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import {
    Button,
    Checkbox,
    CircularProgress,
    FormControl,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography,
    Slider,
    Select,
    MenuItem
} from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import { FaUser, FaMobileAlt, FaMapMarkerAlt, FaMoneyBillWave } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import ChatWidget from "./ChatWidget";
import { getUsers, registUser } from "../api/users";
import '@fontsource/rubik';
import { useSelector } from "react-redux";

const SmartAdvisorLogin = ({ isOpen }) => {
    const { register, handleSubmit } = useForm();
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
    const [subTitle, setSubtitle] = useState('Silakan isi formulir di bawah ini untuk memulai percakapan');
    const { chatMessage } = useSelector((state) => state.chat);

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
                setSubtitle('Data ini dikirimkan otomatis oleh pihak ketiga');
            }
        });
    }, []);

    useEffect(() => {
        validationForm();
    });

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

    const formatRupiah = (value) => {
        if (value >= 1000000) {
            return `${(value / 1000000).toFixed(1)}jt`;
        }
        return `${(value / 1000).toFixed(0)}rb`;
    };

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
        setSendTrigger(true);
    };

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
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    background: '#EFEFEF',
                    overflow: 'hidden',
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
                        <Box sx={{ width: '100%', position: 'relative', marginTop: -5, marginLeft: -2 }}>
                            <img src="bgDashboard.png" alt="Dashboard" style={{ width: '102%', borderTopLeftRadius: 8, borderTopRightRadius: 8, marginTop: -5 }} />
                        </Box>
                        <Box sx={{ px: { xs: 1.5, sm: 2 }, py: 1, width: '100%' }}>
                            <Typography sx={{ fontSize: { xs: 12, sm: 13 }, color: '#4B5563', mb: 0.5, textAlign: 'center' }}>
                                Cari tempat tinggal yang pas buat kamu?
                            </Typography>
                            <Typography sx={{ fontWeight: 700, fontSize: { xs: 18, sm: 20 }, color: '#222', mb: 2, textAlign: 'center' }}>
                                Yuk, temukan hunian idealmu!
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
                                Ada yang bisa Mbak Singgah bantu?
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
                                    onClick={() => handleQuickSend("Aku butuh rekomendasi tempat tinggal nih, bantu cariin kost atau kontrakan yang cocok dong")}
                                >
                                    <img
                                        src="recom.png"
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
                                            Rekomendasi Hunian
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
                                                handleQuickSend("Aku butuh rekomendasi tempat tinggal nih, bantu cariin kost atau kontrakan yang cocok dong");
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
                                    onClick={() => handleQuickSend(`Aku ${statusPernikahan || 'lajang'}, budgetku sekitar ${formatRupiah(budgetMin)} - ${formatRupiah(budgetMax)}, cari di daerah ${lokasi || 'Jakarta'}. Aku ingin konsultasi soal tempat tinggal yang cocok?`)}
                                >
                                    <img
                                        src="consult.png"
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
                                            Konsultasi Hunian
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
                                                handleQuickSend(`Aku ${statusPernikahan || 'lajang'}, budgetku sekitar ${formatRupiah(budgetMin)} - ${formatRupiah(budgetMax)}, cari di daerah ${lokasi || 'Jakarta'}. Aku ingin konsultasi soal tempat tinggal yang cocok?`);
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
                                    <InputLabel htmlFor="outlined-adornment-name">Nama Lengkap</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-name"
                                        value={name}
                                        startAdornment={<InputAdornment position="start"><FaUser /></InputAdornment>}
                                        label="Nama Lengkap"
                                        size="small"
                                        required
                                        readOnly={readOnly}
                                        onChange={e => setName(e.target.value)}
                                    />
                                </FormControl>

                                <FormControl fullWidth sx={{ marginTop: { xs: 2, sm: 3 } }}>
                                    <InputLabel htmlFor="outlined-adornment-phone">Nomor HP</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-phone"
                                        value={phone}
                                        startAdornment={<InputAdornment position="start"><FaMobileAlt /></InputAdornment>}
                                        label="Nomor HP"
                                        size="small"
                                        required
                                        readOnly={readOnly}
                                        onChange={handleChangeNumber}
                                    />
                                </FormControl>

                                <FormControl fullWidth sx={{ marginTop: 3 }}>
                                    <InputLabel htmlFor="status-pernikahan">Status Pernikahan</InputLabel>
                                    <Select
                                        id="status-pernikahan"
                                        value={statusPernikahan}
                                        label="Status Pernikahan"
                                        size="small"
                                        required
                                        disabled={readOnly}
                                        onChange={e => setStatusPernikahan(e.target.value)}
                                        startAdornment={<InputAdornment position="start"><FaUser /></InputAdornment>}
                                    >
                                        <MenuItem value="">Pilih</MenuItem>
                                        <MenuItem value="lajang">Lajang</MenuItem>
                                        <MenuItem value="menikah">Menikah</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth sx={{ marginTop: 3 }}>
                                    <Typography gutterBottom sx={{ textAlign: 'left', fontSize: 14, color: '#666' }}>
                                        <FaMoneyBillWave style={{ marginRight: 8, verticalAlign: 'middle' }} />
                                        Range Budget per Bulan: {formatRupiah(budgetMin)} - {formatRupiah(budgetMax)}
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
                                        <span>300rb</span>
                                        <span>20jt</span>
                                    </Box>
                                </FormControl>

                                <FormControl fullWidth sx={{ marginTop: 3 }}>
                                    <InputLabel htmlFor="outlined-adornment-lokasi">Lokasi yang Dicari</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-lokasi"
                                        value={lokasi}
                                        startAdornment={<InputAdornment position="start"><FaMapMarkerAlt /></InputAdornment>}
                                        label="Lokasi yang Dicari"
                                        size="small"
                                        required
                                        readOnly={readOnly}
                                        placeholder="Contoh: Jakarta Selatan, Bandung, dll"
                                        onChange={e => setLokasi(e.target.value)}
                                    />
                                </FormControl>

                                <Grid2 container spacing={2} sx={{ marginTop: 1 }}>
                                    <Grid2 size={2}>
                                        <Checkbox {...register("termscondition")} {...label} sx={{ paddingX: 0, paddingY: 2 }} onChange={handleChangeCheckbox} />
                                    </Grid2>
                                    <Grid2 size={10}>
                                        <p style={{ fontWeight: 'normal', textAlign: 'justify', fontSize: '15px' }}>
                                            Dengan menggunakan layanan Singgah, saya menyetujui Kebijakan privasi di sini adalah benar.
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
                                    Mulai Chat
                                </Button>
                            </form>
                        </Box>
                    ) : (
                        <ChatWidget
                            isOpen={isOpen}
                            name={name}
                            phone={phone}
                            inputFrom={input}
                            sessionId={sessionId}
                            sendTrigger={sendTrigger}
                            setSendTrigger={setSendTrigger}
                        />
                    )
                ) : (
                    <div style={widgetStyles.containerLoading}>
                        <Box textAlign="center">
                            <CircularProgress size={40} style={widgetStyles.childLoading} /><br /><br />
                            <label>Please Wait...</label>
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
