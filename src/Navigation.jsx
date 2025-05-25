import Stepper from '@mui/joy/Stepper';
import Step from '@mui/joy/Step';
import StepIndicator from '@mui/joy/StepIndicator';
import Box from '@mui/joy/Box';
import './App.css';



export default function Navigation({ step, goStep, steps }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', pt: 4, pb: 4, width: 1, flex: 1 }}>

      <Stepper orientation="horizontal" sx={{ flex: 0.75, gap: 6 }}>

        {steps.map((s, idx) => (
          <Step orientation="horizontal" key={s.label} active={step === idx} completed={step > idx} onClick={() => goStep(idx)}>
            <StepIndicator
              variant="plain"
              sx={{
                color: step === idx ? '#1976d2' : '#888',
                mb: 1,
                cursor: 'pointer',
                fontSize: '2rem',
                fontWeight: 400,
                height: 1,
                display: 'flex',
                alignItems: 'center',

                // TODO: dunno why this is needed; weird negative padding or margin on ol
                ml: 7,

                "& .icon": {
                  backgroundColor: 'white',
                  height: '100%',
                  width: '100%',
                  px: 1,
                },
                "& .label": {
                  backgroundColor: 'white',
                  height: '100%',
                  pr: 1
                }
              }}
            >
              <Box className="icon">{s.icon}</Box>
              <Box className="label">{s.label}</Box>
            </StepIndicator>

          </Step>
        ))}

      </Stepper>


    </Box>
  );
}

