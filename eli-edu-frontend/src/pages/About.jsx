import { Box, Container, Typography, Grid, Card, CardContent, Avatar, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TestimonialsCarousel from '../components/TestimonialsCarousel/TestimonialsCarousel';

const MotionBox = motion(Box);

const pageVariants = {
  initial: {
    opacity: 0,
    x: -20,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: 20,
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

// Add animation variants for Accordion details
const accordionVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto', transition: { duration: 0.3, ease: 'easeInOut' } },
};

function About() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      <Box>
        {/* Mission Section */}
        <Box
          sx={(theme) => ({
            bgcolor: 'primary.main',
            color: 'white',
            py: { xs: 8, md: 12 },
            background: `linear-gradient(90deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          })}
        >
          <Container maxWidth="lg">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography variant="h2" gutterBottom align="center" sx={{ fontWeight: 700 }}>
                Sứ Mệnh Của Chúng Tôi
              </Typography>
              <Typography variant="h5" align="center" sx={{ maxWidth: 800, mx: 'auto', opacity: 0.9 }}>
                Cung cấp nền giáo dục dễ tiếp cận, chất lượng cao nhằm trao quyền cho học viên phát huy hết tiềm năng và tạo ra tác động tích cực trên thế giới.
              </Typography>
            </MotionBox>
          </Container>
        </Box>

        {/* Values Section */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Typography variant="h3" gutterBottom align="center" sx={{ mb: 6, fontWeight: 700 }}>
            Giá Trị Cốt Lõi Của Chúng Tôi
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                title: 'Xuất Sắc',
                description: 'Chúng tôi nỗ lực đạt được sự xuất sắc trong mọi việc làm, từ giảng dạy đến hỗ trợ học viên.',
              },
              {
                title: 'Đổi Mới',
                description: 'Chúng tôi áp dụng các phương pháp và công nghệ giảng dạy đổi mới để nâng cao hiệu quả học tập.',
              },
              {
                title: 'Chính Trực',
                description: 'Chúng tôi duy trì các tiêu chuẩn cao nhất về liêm chính học thuật và đạo đức nghề nghiệp.',
              },
              {
                title: 'Cộng Đồng',
                description: 'Chúng tôi xây dựng một cộng đồng học tập hỗ trợ và hòa nhập.',
              },
            ].map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Card
                    sx={(theme) => ({
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      p: 3,
                      borderRadius: 4,
                      boxShadow: 3,
                      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: theme.shadows[8],
                      },
                    })}
                  >
                    <CardContent>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                        {value.title}
                      </Typography>
                      <Typography color="text.secondary">
                        {value.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </MotionBox>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Team Section */}
        <Box sx={(theme) => ({ bgcolor: theme.palette.background.paper, py: 8 })}>
          <Container maxWidth="lg">
            <Typography variant="h3" gutterBottom align="center" sx={{ mb: 6, fontWeight: 700 }}>
              Ban Lãnh Đạo Của Chúng Tôi
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              {[
                {
                  name: 'Dr. Sarah Johnson',
                  role: 'Giám đốc',
                  image: '/team/sarah.jpg',
                },
                {
                  name: 'Prof. Michael Chen',
                  role: 'Trưởng khoa Học thuật',
                  image: '/team/michael.jpg',
                },
                {
                  name: 'Dr. Emily Rodriguez',
                  role: 'Phụ trách Học vụ',
                  image: '/team/emily.jpg',
                },
              ].map((member, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <Card
                      sx={(theme) => ({
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        p: 3,
                        borderRadius: 4,
                        boxShadow: 3,
                        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: theme.shadows[8],
                        },
                      })}
                    >
                      <Avatar
                        src={member.image}
                        alt={member.name}
                        sx={{
                          width: 120,
                          height: 120,
                          mb: 2,
                          border: '4px solid',
                          borderColor: 'primary.main',
                        }}
                      />
                      <CardContent>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                          {member.name}
                        </Typography>
                        <Typography color="text.secondary">
                          {member.role}
                        </Typography>
                      </CardContent>
                    </Card>
                  </MotionBox>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Testimonials Section */}
        <Box sx={{ py: 8, bgcolor: 'background.default' }}>
          <Container maxWidth="lg">
            <Typography variant="h3" gutterBottom align="center" sx={{ mb: 6, fontWeight: 700 }}>
              Phản Hồi Từ Học Viên
            </Typography>
            <TestimonialsCarousel />
          </Container>
        </Box>

        {/* FAQ Section */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Typography variant="h3" gutterBottom align="center" sx={{ mb: 6, fontWeight: 700 }}>
            Các Câu Hỏi Thường Gặp
          </Typography>
          <Grid container spacing={3}>
            {[
              {
                question: 'Yêu cầu đầu vào cho các khóa học của bạn là gì?',
                answer: "Yêu cầu đầu vào của chúng tôi khác nhau tùy thuộc vào cấp độ khóa học. Đối với các khóa học cơ bản, không cần kinh nghiệm trước đó. Đối với các khóa học trung cấp và nâng cao, chúng tôi yêu cầu kiểm tra trình độ để đảm bảo bạn được xếp đúng cấp độ. Liên hệ với đội ngũ tuyển sinh của chúng tôi để biết các yêu cầu cụ thể.",
              },
              {
                question: 'Thời lượng khóa học là bao lâu?',
                answer: "Thời lượng khóa học dao động từ 8 đến 16 tuần, tùy thuộc vào chương trình. Các khóa học chuyên sâu có sẵn cho những người muốn hoàn thành việc học nhanh hơn. Chúng tôi cũng cung cấp các tùy chọn lịch trình linh hoạt để phù hợp với các nhu cầu khác nhau.",
              },
              {
                question: 'Bạn có cung cấp các khóa học trực tuyến không?',
                answer: "Có, chúng tôi cung cấp cả khóa học trực tiếp và trực tuyến. Nền tảng trực tuyến của chúng tôi cung cấp chất lượng giáo dục tương đương với các tính năng tương tác, các buổi học trực tiếp và phản hồi cá nhân hóa. Bạn có thể chọn định dạng phù hợp nhất với nhu cầu của mình.",
              },
              {
                question: 'Sĩ số lớp học là bao nhiêu?',
                answer: "Chúng tôi duy trì sĩ số lớp học nhỏ từ 8-12 học viên để đảm bảo sự quan tâm cá nhân và học tập hiệu quả. Điều này cho phép giáo viên của chúng tôi tập trung vào nhu cầu cá nhân và cung cấp phản hồi chi tiết.",
              },
              {
                question: 'Bạn có cung cấp chứng chỉ sau khi hoàn thành không?',
                answer: "Có, tất cả các khóa học của chúng tôi đều cung cấp chứng chỉ sau khi hoàn thành thành công. Chứng chỉ của chúng tôi được công nhận bởi các tổ chức giáo dục và nhà tuyển dụng trên toàn thế giới. Chúng tôi cũng cung cấp chương trình luyện thi các kỳ thi được quốc tế công nhận như IELTS và TOEFL.",
              },
              {
                question: 'Bạn cung cấp những dịch vụ hỗ trợ nào?',
                answer: "Chúng tôi cung cấp hỗ trợ toàn diện bao gồm tư vấn học thuật, tư vấn nghề nghiệp, hỗ trợ chỗ ở và hỗ trợ học viên 24/7. Đội ngũ tận tâm của chúng tôi luôn sẵn sàng giúp bạn thành công trên hành trình giáo dục của mình.",
              },
            ].map((faq, index) => (
              <Grid item xs={12} key={index}>
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Accordion
                    sx={(theme) => ({
                      '&:before': {
                        display: 'none',
                      },
                      boxShadow: 'none',
                      border: '1px solid',
                      borderColor: theme.palette.divider,
                      borderRadius: 2,
                      '&:not(:last-child)': {
                        mb: 2,
                      },
                    })}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      sx={{
                        '&:hover': {
                          bgcolor: 'action.hover',
                        },
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>{faq.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0 }}>
                      <AnimatePresence initial={false}>
                        <motion.div
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          variants={accordionVariants}
                          key={faq.question}
                        >
                          <Box sx={{ p: 2 }}>
                            <Typography color="text.secondary">
                              {faq.answer}
                            </Typography>
                          </Box>
                        </motion.div>
                      </AnimatePresence>
                    </AccordionDetails>
                  </Accordion>
                </MotionBox>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Accreditation Section */}
        <Box sx={(theme) => ({ bgcolor: theme.palette.background.paper, py: 8 })}>
          <Container maxWidth="lg">
            <Typography variant="h3" gutterBottom align="center" sx={{ mb: 6, fontWeight: 700 }}>
              Chứng Nhận Của Chúng Tôi
            </Typography>
            <Grid container spacing={4} justifyContent="center" alignItems="center">
              {[
                {
                  name: 'Tiêu Chuẩn Giáo Dục Quốc Tế',
                  image: '/accreditations/ies.png',
                },
                {
                  name: 'Chứng Nhận Chất Lượng Giáo Dục',
                  image: '/accreditations/qec.png',
                },
                {
                  name: 'Nâng Cao Học Tập Toàn Cầu',
                  image: '/accreditations/gle.png',
                },
              ].map((accreditation, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <MotionBox
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      src={accreditation.image}
                      alt={accreditation.name}
                      sx={{
                        height: 100,
                        mb: 2,
                        filter: 'grayscale(100%)',
                        transition: 'filter 0.3s ease-in-out',
                        '&:hover': {
                          filter: 'grayscale(0%)',
                        },
                      }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>{accreditation.name}</Typography>
                  </MotionBox>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Box>
    </motion.div>
  );
}

export default About; 