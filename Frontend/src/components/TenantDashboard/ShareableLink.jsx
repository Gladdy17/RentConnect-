import React from "react";
import { Box } from '@mui/system'
import { Button, Paper, Tooltip } from '@mui/material';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';

function ShareableLink() {
  return(
    <>
      <Paper sx={{height: '100px'}} className="copy-box">
            <Box sx={{p: '20px'}}>
                RentConnect/my-tenant-page.com
            </Box>
            <Tooltip title="Copy to clipboard">
                <Button sx={{minWidth: '30px'}}>
                    <ContentCopyRoundedIcon 
                    style={{cursor: "pointer"}}
                    sx={{height: '20px', color: '#FFFFF'}}
                    onClick={async () => {
                      await navigator.clipboard.writeText('https://www.RentConnect.ca/tenant?my_page')
                    }}
                    />
                </Button>
            </Tooltip>
        </Paper>
    </>
  )
}

export default ShareableLink;