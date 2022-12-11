import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom"
export default function ContentList() {
  return (
    
    <>
    <Box style={{marginTop: '40px',display: 'flex', width: '70%'}}>
    <h2 style={{fontFamily: 'Helvetica, Arial, Tahoma, sans-serif',color: '#253b80'}}>ARTICLE</h2>
    </Box>
        <Card sx={{ display: 'flex', marginTop: "40px",width: '70%',backgroundColor: '#ebebeb',
        height: 200,
        '&:hover': {
          opacity: [0.9, 0.8, 0.7] }}}>
        <CardMedia
        component="img"
        sx={{ width: 300, height: 160, marginLeft: '10px' }}
        image="https://fasttrack.edu.vn/wp-content/uploads/2020/10/nganh-nao-trong-IT-ma-khong-can-code-1.jpg"
        alt="Live from space album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '30px', width: '90%', }}>
        
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5" textAlign = 'left'>
            TẠI SAO CẦN HỌC JAVASCRIPT?
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign= 'justify' sx={{ marginTop : '10px' }}>
          Javascript cho phép bạn xây dựng các trang web tương tác. Nếu nghĩ về cấu trúc của một trang web, bạn có HTML – mô tả và xác định nội dung cấu trúc cơ bản của trang web, bạn có CSS – 
          cho trình duyệt biết nội dung HTML này sẽ được hiển thị như  thế nào khi xác định những thứ như màu sắc hay phông chữ.Chỉ với HTML và CSS, bạn có một trang web có vẻ tốt nhưng thực sự thì thiếu rất nhiều. JavaScript làm cho trang web trở nên sống động bằng cách thêm chức năng. JavaScript chịu trách nhiệm cho các yếu tố mà người dùng có thể tương tác
        </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
        </Box>
      </Box>
    </Card>
    <Card sx={{ display: 'flex', marginTop: "5px",width: '70%',backgroundColor: '#ebebeb',
        height: 200,
        '&:hover': {
          opacity: [0.9, 0.8, 0.7] }}}>
        <CardMedia
        component="img"
        sx={{ width: 300, height: 160, marginLeft: '10px' }}
        image="https://fasttrack.edu.vn/wp-content/uploads/2021/11/H%E1%BB%8CC-L%E1%BA%ACP-TR%C3%8CNH-RA-S%E1%BA%BC-L%C3%80M-G%C3%8C-KV-2-1300x626.png"
        alt="Live from space album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '30px', width: '90%' }}>
        
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5" textAlign = 'left'>
          HỌC LẬP TRÌNH RA SẼ LÀM GÌ?
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign= 'justify' sx={{ marginTop : '10px' }} >
          Ngành CNTT nói chung và lĩnh vực Lập trình viên nói riêng đang là thị trường “khát nhân lực” bậc nhất tại Việt Nam. Theo thống kê của
           các kênh tuyển dụng, hiện nay nhu cầu tuyển dụng của ngành Công nghệ thông tin (CNTT) tại Việt Nam đã tăng gấp 4 lần, trong đó nhóm 
           ngành phát triển phần mềm như Lập trình viên luôn đạt mức tăng trưởng gấp đôi, chiếm hơn 50% nhu cầu tuyển dụng của toàn ngành Công 
           nghệ thông tin. Vậy học lập trình ra sẽ làm gì trong môi trường tuyển dụng cao như thế?
        </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
        </Box>
      </Box>
    </Card>
    <Card sx={{ display: 'flex', marginTop: "5px",width: '70%',backgroundColor: '#ebebeb',
        height: 200,
        '&:hover': {
          opacity: [0.9, 0.8, 0.7] }}}>
        <CardMedia
        component="img"
        sx={{ width: 300, height: 160, marginLeft: '10px' }}
        image="https://fasttrack.edu.vn/wp-content/uploads/2021/11/Blue-Graphic-Designer-Portfolio-Website-1300x626.png"
        alt="Live from space album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '30px', width: '90%' }}>
        
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5" textAlign = 'left' >
          DEVELOPER LÀ GÌ? LÀM SAO ĐỂ TRỞ THÀNH DEVELOPER?
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign= 'justify' sx={{ marginTop : '10px' }}>
          Hòa mình vào sự phát triển của xã hội 4.0, những ngành nghề CNTT vẫn luôn là từ khóa HOT nhất trong thị trường công việc. 
          Đặc biệt là đối với Developer – lĩnh vực luôn ở trong tình trạng “khát” nhân lực toàn cầu. Vậy Developer là ai? 
          Công việc của Developer là gì? Học gì để làm Developer? Hãy cùng Fast Track tìm hiểu qua bài viết dưới đây nhé!
          Developer thường đóng vai trò quan trọng trong quá trình tạo ra phần mềm. Bởi họ chính là người sử dụng thành thạo các ngôn ngữ 
          lập trình để viết ra các đoạn code.
        </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
        </Box>
      </Box>
    </Card>
    
  
    <div style={{marginTop: '20px', marginBottom: '20px', width: '70%', justifyContent: 'flex-end', display: 'flex'}}>
      <Button variant="contained" color="success"><Link to="/home/post/newest" style={{fontWeight:"bold", color:"white"}}>More</Link></Button>
    </div>
    </>
    
  );
}
